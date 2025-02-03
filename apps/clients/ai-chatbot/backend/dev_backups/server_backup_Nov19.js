import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { slowDown } from 'express-slow-down'
import { rateLimit } from 'express-rate-limit'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import fs from 'fs'
import OpenAI from 'openai'
import { query, body, validationResult } from 'express-validator'
import morgan from 'morgan'
import supabase from './'

const __dirname = path.resolve()

// Change (uncomment) these for testing/deployment

const hostname = 'localhost'
const port = process.env.dev_port

// const hostname = '0.0.0.0'
// const port = process.env.port || 8080

const moderateInput = false
const moderateOutput = false

const assistantTable = []
const MAX_ACTIVE_CLIENTS = 50
let activeClientsCount = 0
const lastActivity = {}
const TIMEOUT_DURATION = 5 * 60 * 1000 // 5 minutes

const shortVersion = '1.0.12'
const longVersion = '1.0.12 (November 12, 2024)'

let api_key = process.env.JAPANESE_TRANSLATION_BOT_OPENAI_API_KEY
const openAIJapaneseTranslationAssistant = new OpenAI({ apiKey: api_key })

const model1 = 'gpt-4o-mini'

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, //1 minute
  max: 100
})

const chatGptLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1 hour
  max: 30
})

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 2000
})

const scriptSources = ["'self'", 'http://localhost:3000/']
const styleSources = ["'self'", "'unsafe-inline'"]
const connectSources = ["'self'", 'https://ggivxeeiaurbqmcmdsoj.supabase.co/']
const imageSources = ["'self'", 'data: blob: https://ggivxeeiaurbqmcmdsoj.supabase.co/']

const app = express()

// Middleware setup
app.use(cors())
app.use(compression())
app.use(express.json())
// app.use(morgan('combined'))
app.use(speedLimiter)
app.use(limiter)
// app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: scriptSources,
      styleSrc: styleSources,
      scriptSrc: scriptSources,
      connectSrc: connectSources,
      imgSrc: imageSources
      // Add other directives as needed
    }
  })
)

// Static files
// const staticDir = path.join(__dirname, 'dist')
const staticDir = path.join(__dirname, 'public')
app.use('/', express.static(staticDir))

const blogDir = path.join(__dirname, 'blog')
app.use('/blog', express.static(blogDir))

const chatbotsDir = path.join(__dirname, 'aichatbot')
app.use('/aichatbot', express.static(chatbotsDir))


// Load assistants from environment variables
const loadAssistants = () => {
  console.log('Loading assistants...')
  const allEnvVars = process.env
  let counter = 0
  for (const key in allEnvVars) {
    if (key.endsWith('_OPENAI_API_KEY')) {
      const assistantName = key.split('_')[0]
      const botID = allEnvVars[`${assistantName}_BOT_ID`]
      const assistID = allEnvVars[`${assistantName}_ASSISTANT_ID`]
      const apiKey = allEnvVars[key]
      assistantTable.push({
        name: assistantName,
        assistant_id: assistID,
        botID,
        API_Key: apiKey
      })
      counter++
    }
  }
  console.log(`Loaded ${counter} assistants...`)
}

loadAssistants()

// Functions

// Create a lookup from a thread to an API key (used for deleteTHread)
const threadTable = [{ threadID: 'empty', openAIAsstID: 'empty' }] // , API_Key: ''

function addThreadID (threadId, openAIAsstId, apiKey) {
  threadTable.push({ threadID: threadId }, { openAIAsstID: openAIAsstId })
}

// A simple function to check the query. Should be improved/extended
function validateQuestion (question) {
  if (!question || question.length > 30) {
    // throw { type: 'ChatBotQueryError', message: 'too long' }
    return false
  }
  return true
}

// A simple function to check the translation input. Should be improved/extended
function validateTranslationInput (text) {
  if (!text || text.length > 10000) { // roughly 1,000 words
    // throw { type: 'ChatBotQueryError', message: 'too long' }
    return false
  }
  return true
}

function createOpenAIClient (assistantRecord) {
  if (activeClientsCount >= MAX_ACTIVE_CLIENTS) {
    console.error('Maximum number of active OpenAI clients reached.')
    throw new Error('Too many active clients. Please try again later.')
  }
  const newClient = new OpenAI({ apiKey: assistantRecord.API_Key })
  assistantRecord.client = newClient
  activeClientsCount++
  return newClient
}

function getClientBasedOnID (botID) {
  if (!botID) {
    console.log('No botID was provided')
    return null
  }
  console.log('Looking up client for bot ID: ' + botID)
  const asstRecord = assistantTable.find(record => record.botID === botID)
  if (asstRecord) {
    console.log('Found Asst record: ' + JSON.stringify(asstRecord))
    return asstRecord.client
  }
  console.log('No assistant found for botID: ' + botID)
  return null // Return null if no record is found
}

function getClientBasedOnThreadID (threadID) {
  if (!threadID) {
    console.log('No threadID was provided')
    return null
  }
  const threadRecord = threadTable.find(record => record.threadID === threadID)
  if (threadRecord) {
    const asstRecord = assistantTable.find(
      record => record.openAIAsstID === threadRecord.openAIAsstID
    )
    if (asstRecord) {
      console.log('Asst record from thread: ' + JSON.stringify(asstRecord))
      return asstRecord.client
    }
  }
  console.log('No assistant found for threadID: ' + threadID)
  return null // Return null if no record is found
}

// Get the last assistant message from the messages array
function getLastAssistantMessage (messages, runID) {
  if (!messages) {
    return null
  }
  // console.log('Filtering messages: ' + JSON.stringify(messages.data))
  // Find the last message for the current run
  const lastAssistantMessageForRun = messages.data
    .filter(message => message.run_id === runID && message.role === 'assistant')
    .pop()

  // If an assistant message is found, return it
  if (lastAssistantMessageForRun) {
    const asstMessage = lastAssistantMessageForRun.content[0].text.value
    // console.log(`Message: ${asstMessage} \n`)
    // return asstMessage
    return lastAssistantMessageForRun
  }
  return null
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Routes
app.get('/api/assistants', async (req, res) => {
  const { data, error } = await supabase.from('assistants').select('*')
  if (error) return res.status(400).json({ error })
  res.json(data)
})

app.patch('/api/assistants/:id', async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const { error } = await supabase
    .from('assistants')
    .update({ status })
    .eq('id', id)
  if (error) return res.status(400).json({ error })
  res.json({ message: 'Assistant updated successfully' })
})

// ChatGPT_Assistant.js?id=12345:318
// POST http://localhost:3000/chatbotfileserver/chat-gpt-asst/12345 404 (Not Found)

app.get('/chatbotfileserver/*', chatGptLimiter, async (req, res) => {
  try {
    console.log('request to chatbotfileserver...')
    // console.log( req)
    console.log('get chatbotserver __dirname: ' + __dirname)

    const id = req.query.id
    console.log('get chatbotserver id: ' + req.query.id)
    // console.log("chatbotfileserver  originalUrl" + req.originalUrl)

    let jsFile = 'files/ChatGPT_Assistant_Widget.js'

    if (id === 'tz12345') {
      jsFile = 'files/TZ_ChatGPT_Assistant.js'
    }

    console.log('using chatbot: ' + jsFile)

    const approved = true
    if (approved) {
      res.sendFile(path.join(__dirname, jsFile))
    } else {
      console.log('Request rejected.')
      // res.setHeader('content-type', 'text/javascript');
      // console.log("  res. content-type: " +  res.getHeader('content-type'))
      // res.status(204).send()
      res.sendFile(path.join(__dirname, 'files/empty.js'))
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error || `Something went wrong. ${shortVersion}`)
  }
})

const systemInstructions =
  'Translate the given text between Japanese and English, without any additional greetings or commentary. Do not translate the text into a different language.'

// Chatbot endpoint
app.post('/chat-gpt/translate', chatGptLimiter, async (req, res) => {
  try {
    const inputText = req.body.message
    // console.log('req.body: ' + JSON.stringify(req.body))
    // console.log('req.body.question 1: ' + req.body.message)
    // console.log('req.body.question 2: ' + JSON.stringify(req.body.message))
    // console.log('req.body.question 3: ' + `${question}`)
    // console.log('req.body.question 4: ' + question)

    if (!validateTranslationInput(inputText)) {
      return res.status(400).send(`The query is too long. ${shortVersion}`)
    }

    /*
    const userMessage = {
      role: 'user', // property name may be an identifier
      content: validatedQuestion
    }
    */
    console.log('Translating: ' + JSON.stringify(inputText))
    if (moderateInput) {
      const moderationInput =
        await openAIJapaneseTranslationAssistant.moderations.create({
          model: 'omni-moderation-latest',
          input: inputText
        })

      // console.log(' Moderation input: ' + JSON.stringify(moderationInput))
      if (moderationInput.results[0].flagged) {
        console.log(
          'Sorry, we cannot process this request. Moderation input flagged'
        )
        throw new Error('Moderation output flagged')
      }
    }

    const response =
      await openAIJapaneseTranslationAssistant.chat.completions.create({
        model: model1,
        // prompt: `${question}`,
        // { role: 'system', content: 'You are a helpful assistant.' },
        messages: [
          { role: 'system', content: systemInstructions },
          {
            role: 'user',
            content: inputText
          }
        ],
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 2000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0 // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      })

    const responseMessage = response.choices[0].message.content
    console.log('responseMessage: ' + JSON.stringify(responseMessage))

    if (moderateOutput) {
      const moderationOutput =
        await openAIJapaneseTranslationAssistant.moderations.create({
          model: 'omni-moderation-latest',
          input: responseMessage
        })

      if (moderationOutput.results[0].flagged) {
        console.log(
          'Sorry, we cannot process this request. Moderation output flagged.'
        )
        throw new Error('Moderation output flagged')
      }
    }

    // console.log('response: ' + JSON.stringify(response))
    // console.log("response test content: ");
    // console.log("response id: " + response.id);
    // console.log("response id: " + response.object);
    // console.log("response content Message (0bject): " + JSON.stringify(response.choices[0].message));
    // console.log("response content role: " + response.choices[0].message.role);
    // console.log('response content: ' + response.choices[0].message.content)

    res.status(200).send({
      bot: responseMessage
    })
  } catch (error) {
    console.error(error)
    // console.error(error.type)
    if (error.type === 'ChatBotQuestionError') {
      // console.log('ChatBotQuestionError')
      res.status(400).send(error || `The query is too long ${shortVersion}`)
    } else if (error.type === 'insufficient_quota') {
      // console.log('insufficient_quota')
      // console.log(error.message)
      res.status(429).send(`Sorry, insufficient quota ${shortVersion}`)
    } else {
      res.status(500).send(error || `Something went wrong. ${shortVersion}`)
    }
  }
})

// Chatbot endpoint
app.post('/chat-gpt-asst*',[
    query('id').notEmpty(),
    body('message').isString().trim().escape(),
    // body('lastMessageID').optional().isString().trim().escape(),
    // body('threadID').optional().isString().trim().escape()
  ],
  chatGptLimiter,
  async (req, res) => {
    console.log('chat-gpt-asst...')
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('errors: ' + JSON.stringify(errors))
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { message, threadID, lastMessageID } = req.body

      console.log('chat-gpt-asst...')

      // will be set later if not included
      let threadId = threadID
      let lastMessageId = lastMessageID
      let asstBotID = null

      const question = message

      console.log('question: ' + question)

      if (!validateQuestion(question)) {
        throw {
          type: 'ChatBotQueryError',
          message: 'Message was rejected (too long?)'
        }
      }

      if (req.query) {
        asstBotID = req.query.id
      }

      // Throw an error or return a generic chat assistant?
      if (!asstBotID) {
        console.log('No Assistant ID provide')
        throw {
          type: 'ChatBotQueryError',
          message: 'No Assistant ID provided'
        }
      }
      const assistantRecord = assistantTable.find(
        record => record.botID === asstBotID
      )
      if (!assistantRecord)
        return res.status(404).send(`Assistant not found for ID: ${asstBotID}`)

      // Handle OpenAI client creation and message processing...
      // (Your existing logic here)

      const asst_id = assistantRecord.assistant_id
      let openaiClient = assistantRecord.client

      if (!openaiClient) {
        // Look up the OpenAI client based on bot ID or thread ID
        openaiClient =
          getClientBasedOnID(asstBotID) || getClientBasedOnThreadID(threadId)
      }

      // If the client does not exist, create it dynamically
      if (!openaiClient) {
        console.log(
          'No openAI client exists for this assistant (ID) ' +
            asstBotID +
            '. Initing one...'
        )
        // const assistantRecord = assistantTable.find(record => record.botID === asstBotID);
        openaiClient = createOpenAIClient(assistantRecord)
      }

      console.log('Opening connection to OpenAI...')

      const assistant = await openaiClient.beta.assistants.retrieve(asst_id)
      // console.log('Assistant: ' + JSON.stringify(assistant))

      if (!threadID || threadID.length === 0) {
        console.log('No Thread ID passed.')
        const thread = await openaiClient.beta.threads.create()
        // console.log('thread: ' + JSON.stringify(thread))
        if (!thread) {
          console.log('thread not created')
          return
        }
        threadId = thread.id
      }

      console.log('Thread ID: ' + threadId)

      // Update last activity timestamp
      lastActivity[threadId] = Date.now()
      addThreadID(threadId, asst_id)

      const newMessage = await openaiClient.beta.threads.messages.create(
        threadId,
        {
          role: 'user',
          content: question
        }
      )

      const run = await openaiClient.beta.threads.runs.createAndPoll(threadId, {
        assistant_id: assistant.id
      })

      if (run.status === 'completed') {
        let messages = null
        if (lastMessageId) {
          console.log('Getting messages after: ', lastMessageId)
          messages = await openaiClient.beta.threads.messages.list(
            run.thread_id,
            {
              order: 'desc',
              before: lastMessageId
            }
          )
        } else {
          console.log('Getting all messages...')
          messages = await openaiClient.beta.threads.messages.list(
            run.thread_id,
            {
              order: 'desc'
            }
          )
        }

        // console.log('Messages from run: ', JSON.stringify(messages))
        // const lastMessageID = messages.body.last_id
        // const firstMessageID = messages.body.first_id
        // console.log('Last message ID after run: ', lastMessageID)
        // console.log('First message ID after run: ', firstMessageID)
        // console.log('run.id: ', run.id)

        const assistantResponse = getLastAssistantMessage(messages, run.id)

        if (!assistantResponse) {
          throw {
            type: 'ChatBotResponseError',
            message: 'No response from assistant'
          }
        }

        // console.log('assistantResponse: ', JSON.stringify(assistantResponse))

        const assistantResponseText = assistantResponse.content[0].text.value
        // console.log('assistantResponseText: ', assistantResponseText)

        const lastAsstMessageID = assistantResponse.id
        // console.log("lastMessageID (assistantResponse.id): " + lastAsstMessageID)

        res.status(200).send({
          bot: assistantResponseText,
          threadID: threadId,
          lastMessageID: lastAsstMessageID
        })
      }
    } catch (error) {
      console.error('Error:', error)
      switch (error.type) {
        case 'invalid_request_error':
          console.error('Error: ' + error.message)
          if (error.code === '404') {
            return res
              .status(400)
              .send(`Sorry. No assistant found. ${shortVersion}`)
          }
          return res.status(400).send(`Invalid Request Error. ${shortVersion}`)
        case 'ChatBotQueryError':
          console.log(error.message)
          return res
            .status(400)
            .send(`Invalid message (Too long?). ${shortVersion}`)
        case 'ChatBotResponseError':
          console.log(error.message)
          return res
            .status(400)
            .send(`Sorry, invalid response. ${shortVersion}`)

        case 'insufficient_quota':
          console.log(error.message)
          return res
            .status(429)
            .send(`Sorry, insufficient quota. ${shortVersion}`)

        default:
          return res.status(500).send(`Something went wrong. ${shortVersion}`)
      }
    }
  }
)

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

/* Upload new file
app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
  // Handle file upload logic (e.g., save to Supabase storage)
  res.json({ message: 'File uploaded successfully', file: req.file });
});
*/
