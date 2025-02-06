import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid';  // Add UUID import

import { validateToken, authenticateToken, authorizeRole } from './middleware/auth.js';
import { loginAdmin, getLoginChallenge } from './adminAuth.js';

import useOpenAI from './useOpenAI.js';
import useAnthropic from './useAnthropic.js';

const __dirname = path.resolve()

// const pathToBackend = __dirname.endsWith("backend") ? __dirname : path.join(__dirname, 'backend')

/*
const pathToMiraApp = __dirname.endsWith("backend") ? path.join(__dirname, 'mira') : path.join(__dirname, 'backend', 'mira')

const pathToEnvFile = __dirname.endsWith("backend") ? path.join(__dirname, '.env') : path.join(__dirname, 'backend', '.env')

const pathToAIChatBot = path.join(pathToMiraApp, 'aichatbot')

dotenv.config({ path: pathToEnvFile })
*/

const pathToBackend = __dirname
const pathToMiraApp = path.join(__dirname, 'mira') 
// const pathToEnvFile = path.join(__dirname, '.env')
// const pathToFiles = path.join(__dirname, 'files') 
const pathToAIChatBot = path.join(pathToMiraApp, 'aichatbot')

dotenv.config() //{ path: pathToEnvFile} 

// In-memory session store
const activeSessions = new Map()

// Session cleanup interval (every 15 minutes)
setInterval(() => {
  const now = Date.now()
  for (const [sessionId, session] of activeSessions.entries()) {
    if (now > session.expiresAt) {
      activeSessions.delete(sessionId)
    }
  }
}, 15 * 60 * 1000)

const app = express();
const PORT = process.env.dev_port || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(pathToBackend, 'public')));
app.use(express.static(path.join(pathToMiraApp, 'blog')));
app.use(express.static(path.join(pathToMiraApp, 'dashboard')));
app.use(express.static(pathToAIChatBot))

app.use(useOpenAI)
app.use(useAnthropic)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Login challenge endpoint
app.post('/admin/challenge', getLoginChallenge);

// Check authentication status
app.get('/api/auth/status', (req, res) => {
  const sessionId = req.headers['x-session-id']
  const token = req.headers['authorization']?.split(' ')[1]

  if (!sessionId || !token) {
    return res.status(401).json({ authenticated: false })
  }

  // Validate session
  const session = activeSessions.get(sessionId)
  if (!session || Date.now() > session.expiresAt) {
    if (session) {
      activeSessions.delete(sessionId)
    }
    return res.status(401).json({ authenticated: false })
  }

  // Validate token using our flexible validation method
  const decodedToken = validateToken(token, 'admin')
  
  if (!decodedToken) {
    return res.status(401).json({ authenticated: false })
  }

  // Additional check to ensure token matches session user
  if (decodedToken.username !== session.user.username) {
    return res.status(401).json({ authenticated: false })
  }

  return res.json({
    authenticated: true,
    user: session.user
  })
})

// Login route
app.post('/admin/login', (req, res) => {
  loginAdmin(req, res, (user, token) => {
    // Generate a unique session ID using UUID V4
    const sessionId = uuidv4()
    
    // Store session with 1 hour expiry
    activeSessions.set(sessionId, {
      user,
      token,
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour
    })

    res.json({ 
      token,
      sessionId
    })
  })
})

// Serve the main HTML file at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(pathToBackend, 'public', 'index.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(pathToBackend, 'public', 'login.html'));
});

// Serve the blog app
app.get('/blog', (req, res) => {
  console.log("get blog")
  res.sendFile(path.join(pathToBackend, 'mira', 'blog', 'index.html'));
});

// Serve the aichatbot app
app.get('/aichatbot', (req, res) => {
  console.log("get aichatbot")
  res.sendFile(path.join(pathToAIChatBot, 'index.html'));
});

// Function to validate session
const validateSession = (sessionId) => {
  if (!sessionId) return false
  
  const session = activeSessions.get(sessionId)
  if (!session || Date.now() > session.expiresAt) {
    if (session) {
      activeSessions.delete(sessionId)
    }
    return false
  }
  
  return session
}

// GET route for serving dashboard - now checks session ID from URL parameter
app.get('/dashboard', (req, res) => {
  const sessionId = req.query.sid
  const session = validateSession(sessionId)
  
  if (!session) {
    console.log('Invalid session, redirecting to login')
    return res.redirect('/login')
  }
  
  if (session.user.role !== 'admin') {
    console.log('Unauthorized role, redirecting to login')
    return res.redirect('/login')
  }
  
  console.log('Serving dashboard to authenticated user:', session.user.username)
  res.sendFile(path.join(pathToBackend, 'mira', 'dashboard', 'index.html'))
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// ChatGPT_Assistant.js?id=12345:318
// POST http://localhost:3000/chatbotfileserver/chat-gpt-asst/12345 404 (Not Found)

app.get('/chatbotfileserver/*', async (req, res) => {
  console.log('Request to chatbotfileserver...')
  // console.log( req)
  // console.log('get chatbotserver __dirname: ' + __dirname)

  try {
    const id = req.query.id
    console.log('get chatbotserver id: ' + req.query.id)
    // console.log("chatbotfileserver  originalUrl" + req.originalUrl)

    let jsFile = (path.join(pathToFiles, 'ChatGPT_Assistant_Widget.js'))

    if (id === 'tz12345') {
     //  jsFile = 'files/TZ_ChatGPT_Assistant.js'
      jsFile = path.join(pathToFiles, 'TZ_ChatGPT_Assistant.js')
    }

    console.log('using chatbot: ' + jsFile)

    const approved = true
    if (approved) {
      // res.sendFile(path.join(__dirname, jsFile))
      res.sendFile(jsFile)
    } else {
      console.log('Request rejected.')
      // res.setHeader('content-type', 'text/javascript');
      // console.log("  res. content-type: " +  res.getHeader('content-type'))
      // res.status(204).send()
     //  res.sendFile(path.join(__dirname, 'files/empty.js'))
     res.sendFile(path.join(pathToFiles, 'empty.js'))
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error || `Something went wrong. ${shortVersion}`)
  }
})

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
