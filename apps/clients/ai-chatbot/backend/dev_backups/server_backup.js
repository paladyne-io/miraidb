import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { slowDown } from 'express-slow-down'
import { rateLimit } from 'express-rate-limit'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import OpenAI from 'openai'

// Get the 'home' directory
const __dirname = path.resolve()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20
})

// Allow 10 interactions per hour
const chatGptLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10
})

// slow down after 5 interactions in 15 minutes
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: () => 2000
})

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

//const VIRTAG_ASSISTANT_ID = "asst_qZ5c6trrG3VmEAeXAIDL0Oz3"

const VIRTAG_ASSISTANT_ID = process.env.VIRTAG_ASSISTANT_ID
const TZ_ASSISTANT_ID = process.env.TZ_ASSISTANT_ID

let api_key = process.env.VIRTAG_OPENAI_API_KEY
const TZ_OPENAI_API_KEY = process.env.TZ_OPENAI_API_KEY

// console.log("TZ_ASSISTANT_ID: " + TZ_ASSISTANT_ID)

const openaiBE = new OpenAI({ apiKey: api_key })
console.log('openaiBE: ' + openaiBE)

const openaiBD = new OpenAI({ apiKey: TZ_OPENAI_API_KEY })

const assistantTable = [
  {
    botID: '12345',
    openAIAsstID: VIRTAG_ASSISTANT_ID,
    API_Key: api_key,
    client: openaiBE
  },
  {
    botID: 'TZ12345',
    openAIAsstID: TZ_ASSISTANT_ID,
    API_Key: TZ_OPENAI_API_KEY,
    client: null
  }
]

// Create a lookup from a thread to an API key (used for deleteTHread)
const threadTable = [{ threadID: '', openAIAsstID: '', API_Key: '' }]

// Create a lookup from an Assistant-ID to an API key (used for ?)
const AssistantTable = [{ openAIAsstID: '', API_Key: '' }]

function setThreadID (threadID, apiKey) {
  const threadRecord = threadTable.filter(
    record => record.threadID === threadID
  )
  console.log('Thread record: ' + JSON.stringify(threadRecord[0]))
  threadRecord[0].API_Key = apiKey
  console.log('Thread record (revised): ' + JSON.stringify(threadRecord[0]))
}

function getAPIKeyFromThreadID (threadID) {
  const threadRecord = threadTable.filter(
    record => record.threadID === threadID
  )
  console.log('Thread record: ' + JSON.stringify(threadRecord[0]))
  return threadRecord[0].API_Key
}

function setClientBasedOnID (botID, openaiClient) {
  const asstRecord = assistantTable.filter(record => record.botID === botID)
  console.log('Asst record: ' + JSON.stringify(asstRecord[0]))
  asstRecord[0].client = openaiClient
  // console.log('Asst record (revised): ' + JSON.stringify(asstRecord[0]))
}

function getClientBasedOnID (botID) {
  const asstRecord = assistantTable.filter(record => record.botID === botID)
  console.log('Asst record: ' + JSON.stringify(asstRecord[0]))
  return asstRecord[0].client
  // console.log('Asst record (revised): ' + JSON.stringify(asstRecord[0]))
}

const allEnvVars = process.env
// console.log(allEnvVars)

for (const aEnvVar in allEnvVars) {
  if (aEnvVar.endsWith('OPENAI_API_KEY')) {
    // get the client name
    console.log('var: ' + aEnvVar)
  }
}

setClientBasedOnID('TZ12345', openaiBD)

// const hostname = '0.0.0.0'
// const port = process.env.port || 8080

// Change (uncomment) these for testing/deployment

const hostname = 'localhost'
const port = process.env.dev_port

const shortVersion = '1.0.8'
const longVersion = '1.0.8 (October 15, 2024)'
const model1 = 'gpt-4o-mini'
// const model2 = "gpt-3.5-turbo-instruct"

// dotenv.config();
// const configuration = new Configuration({
//  apiKey: process.env.OPENAI_KEY,
// });
// const openai = new OpenAIApi(configuration);
// console.log("OPENAI_API_KEY: " + api_key)
// const port = 8000

const app = express()
app.use(cors())
app.use(speedLimiter)
app.use(limiter)
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('files'))

/*
app.options('*', cors());
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
*/

/*
app.configure(function () {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
});
*/

/*
CORS middleware
https://stackoverflow.com/questions/7067966/why-doesnt-adding-cors-headers-to-an-options-route-allow-browsers-to-access-my */

app.use(function (req, res, next) {
  var oneof = false
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    oneof = true
  }
  if (req.headers['access-control-request-method']) {
    res.header(
      'Access-Control-Allow-Methods',
      req.headers['access-control-request-method']
    )
    oneof = true
  }
  if (req.headers['access-control-request-headers']) {
    res.header(
      'Access-Control-Allow-Headers',
      req.headers['access-control-request-headers']
    )
    oneof = true
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365)
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

/*
app.configure('development', function () {
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  var oneYear = 31557600000;
  //    app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
});
*/

// A simple function to check the query. Should be improved/extended
function validateQuestion (question) {
  if (question.length > 30) {
    throw { type: 'ChatBotQuestionError', message: 'too long' }
  }
  return question
}

// const threadId ="thread_ltQeIABGU73qCJGPTYwYthN7"
/*
const myAssistant = async (threadId, prompt) => {
  try {
    const assistant = await openai.beta.assistants.create({
      name: 'Code Instructor',
      instruction:
        'You are a personal code instructor. Write and run code to answer coding questions.',
      tools: [{ type: 'code_interpreter' }],
      model: 'gpt-4-1106-preview'
    })

    if (!threadId.length) {
      const thread = await openai.beta.threads.create()
      threadId = thread.id
    }
    return threadId
  } catch (err) {
    console.error('Error in chat bot =====>', err)
    return err
  }
}
*/

const deleteThread = async (res, threadId) => {
  const url = `https://api.openai.com/v1/threads/${threadId}`
  // const apiKey = 'your_openai_api_key'; // Replace this with your actual API key

  // try this instead
  // openai.beta.threads.delete(threadId)

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${api_key}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    })

    if (response.ok) {
      // console.log('Thread deleted successfully');
      console.log('Thread ID: ' + threadId + ' was deleted')

      res.status(200).send({
        threadDeleted: true,
        threadid: threadId
      })
    } else {
      const errorData = await response.json()
      console.error('Error deleting thread:', errorData)

      res.status(404).send({
        threadDeleted: false,
        threadid: threadId
      })
    }
  } catch (error) {
    console.error('Request failed:', error)
  }
}

app.delete('/chat-gpt-asst', chatGptLimiter, async (req, res) => {
  try {
    let query = req.query
    if (!query || query.length === 0) {
      console.log('Request to delete thread ignored- No (query) ID: ')
      // send back response?
      return
    }
    const threadId = query.threadid
    if (!threadId || threadId.length === 0) {
      console.log('Call to delete thread without passing thread ID was ignored')
      return
      // send back response?
    }
    console.log('Requested to delete thread: ' + threadId)
    deleteThread(res, threadId)
  } catch (err) {
    // ignored
    console.log('Call to delete thread error: ' + err)
  }
})

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

app.post('/chat-gpt-asst/*', chatGptLimiter, async (req, res) => {
  try {
    const question = req.body.message
    let threadId = req.body.threadID
    let lastMessageId = req.body.lastMessageID
    let asstBotID = null

    if (req.query) {
      asstBotID = req.query.id
    }

    console.log('get gpt-asst id: ' + req.query.id)
    console.log('threadId: ' + threadId)
    console.log('api_key: ' + api_key)
    console.log('customAsstID ' + asstBotID)

    let asst_id = VIRTAG_ASSISTANT_ID // use as default

    if (asstBotID === 'tz12345') {
      asst_id = TZ_ASSISTANT_ID
      console.log('Using TZ_ASSISTANT_ID: ' + TZ_ASSISTANT_ID)
      api_key = TZ_OPENAI_API_KEY
      console.log('Using TZ_API key (api_key): ' + api_key)
    }
    // Look up the Assistants table.
    // if no client exists, create and add one
    // otherwise use it

    let openaiClient = lookupClientFromBotID(asstBotID)
    if (!openaiClient && ( threadId || asstBotID)) {
      // tyr to look up from thread
      openaiClient = lookupClientFromThreadID(threadId)

      if (!openaiClient) {
        // lookup the APIKey
        if (threadId) {
          api_key = getAPIKeyFromThreadID(threadId)
        } else {
          api_key = getAPIKeyFromAssistantsTable(asstBotID)
        }
    }

    openaiClient = new OpenAI({ apiKey: api_key })

    console.log('Opening connection to OpenAI...')

    // const openaiBC = new OpenAI({ apiKey: api_key })
    // console.log('openai BC: ' + openaiBC)

    if (!openaiBC) {
      console.log('No openai?')
      throw {
        type: 'AiServiceConnectionError',
        message: 'Connection to AI model failed'
      }
    }

    const assistant = await openaiBC.beta.assistants.retrieve(asst_id)
    console.log('Assistant: ' + JSON.stringify(assistant))

    // const thread = await openai.beta.threads.create()
    // const threadId = thread.id
    // console.log('lastMessageId (from client): ' + lastMessageId)

    if (!threadId || !threadId.length) {
      console.log('No Thread ID passed.')
      const thread = await openaiBC.beta.threads.create()
      // console.log('thread: ' + JSON.stringify(thread))
      if (!thread) {
        console.log('thread not created')
        return
      }
      threadId = thread.id
    }

    console.log('Thread ID: ' + threadId)

    const message = await openaiBC.beta.threads.messages.create(threadId, {
      role: 'user',
      content: question
    })

    const run = await openaiBC.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistant.id
    })

    if (run.status === 'completed') {
      let messages = null
      if (lastMessageId) {
        console.log('Getting messages after: ', lastMessageId)
        messages = await openaiBC.beta.threads.messages.list(run.thread_id, {
          order: 'desc',
          before: lastMessageId
        })
      } else {
        console.log('Getting all messages...')
        messages = await openaiBC.beta.threads.messages.list(run.thread_id, {
          order: 'desc'
        })
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

      /*
      const assistantResponses = []
      let assistantResponse = ''

      for (const message of messages.data.reverse()) {
        const msg = message.content[0].text.value

        // console.log(`${message.role} > ${msg}`);
        // console.log('response msg: ' + msg)
        // console.log('response threadId : ' + threadId)

        if (message.role === 'assistant') {
          // assistantResponses.push(msg)
          assistantResponse = msg
        }
      }
        */
      // const allResponses = assistantResponses.join("\r\n");

      res.status(200).send({
        bot: assistantResponseText,
        threadID: threadId,
        lastMessageID: lastAsstMessageID
      })
      //} else {
      //  console.log(run.status);
    }
  } catch (error) {
    // TODO Use Switch/Case instead of if
    // console.error(error)
    console.error('Error type: ' + error.type)

    if (error.type === 'invalid_request_error') {
      console.error('Error: ' + error.message)
      if (error.code === '404') {
        res.status(400).send(`Sorry. No assistant found.  ${shortVersion}`)
      } else {
        res.status(400).send(`invalid Request Error.  ${shortVersion}`)
      }
    } else if (error.type === 'ChatBotResponseError') {
      // console.log('No response from assistant')
      console.log(error.message)
      res.status(400).send(`Sorry, invalid request.  ${shortVersion}`)
    } else if (error.type === 'insufficient_quota') {
      // console.log('insufficient_quota')
      console.log(error.message)
      res.status(429).send(`Sorry, insufficient quota. ${shortVersion}`)
    } else {
      res.status(500).send(error || `Something went wrong. ${shortVersion}`)
    }
  }
})

/*
app.post('/chat-gpt', chatGptLimiter, async (req, res) => {
  try {
    const question = req.body.message
    // console.log('req.body: ' + JSON.stringify(req.body))
    // console.log('req.body.question 1: ' + req.body.message)
    // console.log('req.body.question 2: ' + JSON.stringify(req.body.message))
    // console.log('req.body.question 3: ' + `${question}`)
    // console.log('req.body.question 4: ' + question)

    const validatedQuestion = validateQuestion(question)
    // console.log('validatedQuestion: ' + validatedQuestion)

    const userMessage = {
      role: 'user', // property name may be an identifier
      content: question
    }
    // console.log('question: ' + JSON.stringify(userMessage))

    const response = await openai.chat.completions.create({
      model: model1,
      // prompt: `${question}`,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        userMessage
      ],
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 2000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0 // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    })

    // console.log('response: ' + JSON.stringify(response))
    // console.log("response test content: ");
    // console.log("response id: " + response.id);
    // console.log("response id: " + response.object);
    // console.log("response content Message (0bject): " + JSON.stringify(response.choices[0].message));
    // console.log("response content role: " + response.choices[0].message.role);
    // console.log('response content: ' + response.choices[0].message.content)

    res.status(200).send({
      bot: response.choices[0].message.content
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
  */

/*

res.sendFile() needs an absolute path, so we also need to require path module. As here files are served from a specific route, we can also use any authentication middleware if we want, but in that case, we have to pass the token via header or via query params, which complicates things a little bit.
Internally, res.sendFile() pipe a stream to response stream.
*/

app.get('/chatbotfileserver/*', chatGptLimiter, async (req, res) => {
  try {
    console.log('reqeust to chatbotfileserver...')
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

app.listen(port, hostname, () => {
  console.log(
    `Virtag AIChatbot Server (${longVersion}) is running at http://${hostname}:${port}/`
  )
})
