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
import {createClient} from '@supabase/supabase-js'

import  { query, body, validationResult } from 'express-validator'
import morgan from 'morgan'

// const { body, validationResult } = require('express-validator');
// Get the 'home' directory
const __dirname = path.resolve()

const assistantTable = []

const MAX_ACTIVE_CLIENTS = 50;
let activeClientsCount = 0;

const activeClients = {}; // To track active OpenAI clients
const lastActivity = {}; // To track last activity timestamps
const TIMEOUT_DURATION = 5 * 60 * 1000; // 5 minutes

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

/* Upload new file
app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
  // Handle file upload logic (e.g., save to Supabase storage)
  res.json({ message: 'File uploaded successfully', file: req.file });
});
*/

// Load assistants from environment variables
const loadAssistants = () => {
  console.log("Load assistants...\n")
  const allEnvVars = process.env;
  for (const key in allEnvVars) {
    if (key.endsWith('_OPENAI_API_KEY')) {
      const assistantName = key.split('_')[0]; // Extract the assistant name
      const botID = allEnvVars[`${assistantName}_BOT_ID`];
      const openAIAsstID = allEnvVars[`${assistantName}_ASSISTANT_ID`]; // Correctly extract openAIAsstID
      const apiKey = allEnvVars[key];
      const client = null; // Initialize client as null

      assistantTable.push({
        name: assistantName, // Add name parameter
        botID,
        openAIAsstID,
        API_Key: apiKey,
        client
      });
    }
  }
  // console.log("Assistants Table:\n")
  // console.log(JSON.stringify(assistantTable, null, "\t"))
}

function createOpenAIClient(assistantRecord) {
  if (activeClientsCount >= MAX_ACTIVE_CLIENTS) {
    console.error('Maximum number of active OpenAI clients reached.');
    throw new Error('Too many active clients. Please try again later.');
  }
  const newClient = new OpenAI({ apiKey: assistantRecord.API_Key });
  assistantRecord.client = newClient
  activeClientsCount++;
  return newClient
}

// Remember to decrement the count when a client is no longer needed
function releaseOpenAIClient() {
  if (activeClientsCount > 0) {
    activeClientsCount--;
  }
}

// Function to check for inactivity and release clients
function checkInactivity() {
  const now = Date.now();
  for (const threadID in lastActivity) {
    if (now - lastActivity[threadID] > TIMEOUT_DURATION) {
      const assistantRecord = assistantTable.find(record => record.botID === threadID);
      if (assistantRecord) {
        releaseOpenAIClient(assistantRecord.botID);
        delete lastActivity[threadID]; // Remove the thread from tracking
      }
    }
  }
}

loadAssistants();

// Call checkInactivity periodically
setInterval(checkInactivity, 60000); // Check every minute

/* Load assistants from environment variables
const loadAssistants = () => {
  const allEnvVars = process.env
  for (const key in allEnvVars) {
    if (key.endsWith('_OPENAI_API_KEY')) {
      const assistantName = key.split('_')[0]; // Extract the assistant name
      const botID = allEnvVars[`${assistantName}_BOT_ID`];
      const openAIAsstID = allEnvVars[key];
      const apiKey = allEnvVars[`${assistantName}_OPENAI_API_KEY`];
      // const client = new OpenAI({ apiKey });
      const client = null
      assistantTable.push({
        botID,
        openAIAsstID,
        API_Key: apiKey,
        client
      });
    }
  }
  console.log("Assistants Table:\n")
  console.log(JSON.stringify(assistantTable, null, "\t"))
}
*/

/*
const VIRTAG_ASSISTANT_ID = process.env.VIRTAG_ASSISTANT_ID
const TZ_ASSISTANT_ID = process.env.TZ_ASSISTANT_ID

let api_key = process.env.VIRTAG_OPENAI_API_KEY
const TZ_OPENAI_API_KEY = process.env.TZ_OPENAI_API_KEY

// console.log("TZ_ASSISTANT_ID: " + TZ_ASSISTANT_ID)

const openaiBE = new OpenAI({ apiKey: api_key })
console.log('openaiBE: ' + openaiBE)

const openaiBD = new OpenAI({ apiKey: TZ_OPENAI_API_KEY })
*/

// Create a lookup from a thread to an API key (used for deleteTHread)
const threadTable = [{ threadID: '', openAIAsstID: '', API_Key: '' }]

// Create a lookup from an Assistant-ID to an API key (used for ?)
// const AssistantTable = [{ openAIAsstID: '', API_Key: '' }]

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

/*
function setClientBasedOnID (botID, openaiClient) {
  const asstRecord = assistantTable.filter(record => record.botID === botID)
  console.log('Asst record: ' + JSON.stringify(asstRecord[0]))
  asstRecord[0].client = openaiClient
  // console.log('Asst record (revised): ' + JSON.stringify(asstRecord[0]))
}
*/

function setClientBasedOnID(botID, openaiClient) {
  const asstRecord = assistantTable.find(record => record.botID === botID);
  if (asstRecord) {
    asstRecord.client = openaiClient; // Update the existing client
    console.log('Updated Asst record: ' + JSON.stringify(asstRecord));
  } else {
    console.log('No assistant found for botID: ' + botID + '. Create a a new record?');
  }
}

function getClientBasedOnID(botID) {
  const asstRecord = assistantTable.find(record => record.botID === botID);
  if (asstRecord) {
    console.log('Asst record: ' + JSON.stringify(asstRecord));
    return asstRecord.client;
  }
  console.log('No assistant found for botID: ' + botID);
  return null; // Return null if no record is found
}

function getClientBasedOnThreadID(threadID) {
  const threadRecord = threadTable.find(record => record.threadID === threadID);
  if (threadRecord) {
    const asstRecord = assistantTable.find(record => record.openAIAsstID === threadRecord.openAIAsstID);
    if (asstRecord) {
      console.log('Asst record from thread: ' + JSON.stringify(asstRecord));
      return asstRecord.client;
    }
  }
  console.log('No assistant found for threadID: ' + threadID);
  return null; // Return null if no record is found
}

// const allEnvVars = process.env
// console.log(allEnvVars)

/*
for (const aEnvVar in allEnvVars) {
  if (aEnvVar.endsWith('OPENAI_API_KEY')) {
    // get the client name
    console.log('var: ' + aEnvVar)
  }
}
*/

// setClientBasedOnID('TZ12345', openaiBD)

const hostname = '0.0.0.0'
const port = process.env.port || 8080

const supabaseUrl = process.env.SUPABASE_PROJECT_URL
const supabaseKey = process.env.SUPABASE_KEY
// console.log('supabase URL: ' + supabaseUrl)
// console.log('supabaseKey: ' + supabaseKey)

// Change (uncomment) these for testing/deployment
const endpointForJSChatSWidget ="https://virtag-ai.fly.dev/chat-gpt-asst";
const testEndpointForJSChatSWidget ="http://localhost:3000/chat-gpt-asst";

// const hostname = 'localhost'
// const port = process.env.dev_port

const shortVersion = '1.0.9'
const longVersion = '1.0.9 (October 17, 2024)'
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
app.use(morgan('combined')); // Logs requests in Apache combined format
// app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    // Add other directives as needed
  }
}));

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


// Middleware for authentication (implement your own logic)
const authenticate = (req, res, next) => {
  // Check user authentication and role
  next();
};

// Get all assistants
app.get('/api/assistants', authenticate, async (req, res) => {
  const { data, error } = await supabase.from('assistants').select('*');
  if (error) {
    return res.status(400).json({ error });
  }
  res.json(data);
});

// Enable/Disable Assistant
app.patch('/api/assistants/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // true or false
  const { error } = await supabase.from('assistants').update({ status }).eq('id', id);
  if (error) {
    return res.status(400).json({ error });
  }
  res.json({ message: 'Assistant updated successfully' });
});


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

//TODO: Validate the requestor should have access
app.delete('/chat-gpt-asst', [
  query('threadID').notEmpty(),
  query('threadID').optional().isString().trim().escape()
  // Add more validations as needed
],chatGptLimiter, async (req, res) => {
  try {
    let query = req.query
    if (!query || query.length === 0) {
      console.log('Request to delete thread ignored - No (query) ID: ')
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

app.post('/chat-gpt-asst/*',   [
  query('id').notEmpty(),
  body('message').isString().trim().escape(),
  body('threadID').optional().isString().trim().escape(),
  // Add more validations as needed 
  ],
chatGptLimiter, async (req, res) => {
  console.log('called chat-gpt-asst...')

  const errors = validationResult(req);
  console.log('errors: ' + JSON.stringify(errors))

 // if (!errors.isEmpty()) {
 //   return res.status(400).json({ errors: errors.array() });
  //}
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
    console.log('customAsstID ' + asstBotID)
    console.log('Looking up assistant record...')

    const assistantRecord = assistantTable.find(record => record.botID === asstBotID);
    if (!assistantRecord) {
      return res.status(404).send(`Assistant not found for ID: ${asstBotID}`);
    }

    const asst_id =assistantRecord.openAIAsstID
    let openaiClient = assistantRecord.client

    if (!openaiClient) {
      // Look up the OpenAI client based on bot ID or thread ID
      openaiClient = getClientBasedOnID(asstBotID) || getClientBasedOnThreadID(threadId);
    }

    // If the client does not exist, create it dynamically
    if (!openaiClient) {
      console.log('No openAI client exists for this assistant (ID) ' + asstBotID + ". Initing one...")
      // const assistantRecord = assistantTable.find(record => record.botID === asstBotID);
      openaiClient = createOpenAIClient(assistantRecord)
    }

    console.log('Opening connection to OpenAI...')

    const assistant = await openaiClient.beta.assistants.retrieve(asst_id)
    // console.log('Assistant: ' + JSON.stringify(assistant))

    // const thread = await openai.beta.threads.create()
    // const threadId = thread.id
    // console.log('lastMessageId (from client): ' + lastMessageId)

    if (!threadId || !threadId.length) {
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
    lastActivity[threadId] = Date.now();
 
    const message = await openaiClient.beta.threads.messages.create(threadId, {
      role: 'user',
      content: question
    })

    const run = await openaiClient.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistant.id
    })

    if (run.status === 'completed') {
      let messages = null
      if (lastMessageId) {
        console.log('Getting messages after: ', lastMessageId)
        messages = await openaiClient.beta.threads.messages.list(run.thread_id, {
          order: 'desc',
          before: lastMessageId
        })
      } else {
        console.log('Getting all messages...')
        messages = await openaiClient.beta.threads.messages.list(run.thread_id, {
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
res.sendFile() needs an absolute path, so we also need to require path module. As here files are served from a specific route, we can also use any authentication middleware if we want, but in that case, we have to pass the token via header or via query params, which complicates things a little bit.
Internally, res.sendFile() pipe a stream to response stream.
*/

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

// host should not include tailing slash
function generateDynamicJSFileContent(id, host) {
  const filePath = path.join(__dirname, 'files/ChatGPT_Assistant_Widget.js');

  // Read the JavaScript file
  let jsFileContent = fs.readFileSync(filePath, 'utf8');

  // Replace the host variable
  // const newHost = `http://localhost:3000/chat-gpt-asst/?id=${id}`;
  const newHost = `${host}/?id=${id}`;

  console.log("newHost: " + newHost)

  jsFileContent = jsFileContent.replace(/const\s+host\s*=\s*".*?";/, `const host = "${newHost}";`);
  // console.log("newHost: " + newHost)
  return jsFileContent;
}

app.get('/chatbotfileserver/*', chatGptLimiter, async (req, res) => {
  try {
    const id = req.query.id;
    console.log('get chatbot id: ' + id);

    // Check if the assistant is enabled
    const approved = isAssistantEnabled(id);
    if (!approved) {
      console.log('Request rejected: Assistant is not enabled.');
      return res.sendFile(path.join(__dirname, 'files/empty.js'));
    }

    // Find the assistant record based on the bot ID
    const assistantRecord = assistantTable.find(record => record.botID === id);
    if (!assistantRecord) {
      console.error('No assistant found for botID: ' + id);
      return res.sendFile(path.join(__dirname, 'files/empty.js'));
    }

    // console.log('Request rejected: Assistant is not enabled.');

    // Create OpenAI client if it does not exist
    if (!assistantRecord.client) {
      // assistantRecord.client = new OpenAI({ apiKey: assistantRecord.API_Key });
      createOpenAIClient(assistantRecord)
      console.log('chatbotfileserver. Created OpenAI client for botID: ' + id);
    }

    // Generate the JavaScript file content dynamically
    const jsFileContent = generateDynamicJSFileContent(id, endpointForJSChatSWidget);

    // console.log(jsFileContent)

    // Send the dynamically generated JavaScript file
    res.setHeader('Content-Type', 'application/javascript');
    res.send(jsFileContent);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error || `Something went wrong.`);
  }
});

// Function to check if the assistant is enabled
function isAssistantEnabled(botID) {
  // Implement your logic to check if the assistant is enabled
  // For now, return true as a placeholder
  return true;
}

const supabase = createClient(supabaseUrl, supabaseKey)

app.listen(port, hostname, () => {
  console.log(
    `Virtag AIChatbot Server (${longVersion}) is running x at http://${hostname}:${port}/`
  )
})
