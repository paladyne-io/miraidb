// Store session authentication details in memory
let currentSessionId = null
let currentToken = null

async function checkAuthStatus() {
  if (!currentSessionId || !currentToken) return false
  
  try {
    const response = await fetch('/api/auth/status', {
      headers: {
        'X-Session-ID': currentSessionId,
        'Authorization': `Bearer ${currentToken}`
      }
    })
    return response.status === 200
  } catch (error) {
    console.error('Auth status check failed:', error)
    return false
  }
}

// Function to redirect to dashboard with session ID
function redirectToDashboard() {
  // Add session ID as a URL parameter
  window.location.href = `/dashboard?sid=${encodeURIComponent(currentSessionId)}`
}

// Get login challenge from server
async function getLoginChallenge(username) {
  try {
    const response = await fetch('/admin/challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    })
    const { challenge } = await response.json()
    return challenge
  } catch (error) {
    console.error('Failed to get login challenge:', error)
    return null
  }
}

// Client-side password hashing with challenge using Web Crypto API
async function hashPassword(password, username, challenge) {
  // Combine challenge, username, and password for hashing
  const combinedInput = challenge + username + password
  
  // Convert string to Uint8Array
  const encoder = new TextEncoder()
  const data = encoder.encode(combinedInput)
  
  // Use SHA-256 for hashing
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  
  // Convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return hashHex
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm')
  
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const messageEl = document.getElementById('message')

    try {
      // First, get a login challenge from the server
      const challenge = await getLoginChallenge(username)
      
      if (!challenge) {
        messageEl.innerText = 'Failed to get login challenge.'
        return
      }

      // Hash the password with the challenge
      const hashedPassword = await hashPassword(password, username, challenge)

      // Send login request with hashed password and challenge
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username,
          password: hashedPassword,
          challenge
        })
      })

      if (!response.ok) {
        messageEl.innerText = 'Login failed. Please check your credentials.'
        return
      }

      const { sessionId, token } = await response.json()
      
      if (!sessionId || !token) {
        messageEl.innerText = 'Login failed. Invalid server response.'
        return
      }

      // Store session ID and token in memory
      currentSessionId = sessionId
      currentToken = token
      messageEl.innerText = 'Login successful! Redirecting...'

      // Verify authentication status
      const isAuthenticated = await checkAuthStatus()
      if (isAuthenticated) {
        // Redirect to dashboard with session ID
        redirectToDashboard()
      } else {
        messageEl.innerText = 'Authentication failed. Please try again.'
      }
    } catch (error) {
      console.error('Login error:', error)
      messageEl.innerText = 'An error occurred. Please try again.'
    }
  })
})
