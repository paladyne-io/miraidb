// adminAuth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import path from 'path';
import crypto from 'crypto'

const __dirname = path.resolve()
// const pathToEnvFile = __dirname.endsWith("backend") ? path.join(__dirname, '.env') : path.join(__dirname, 'backend', '.env')

dotenv.config() // { path: pathToEnvFile }

const admin1 = {
  username: process.env.admin1name,
  // Store the original password for comparison
  originalPassword: process.env.admin1pwd,
  // Hashed password for storage
  password: bcrypt.hashSync(process.env.admin1pwd, 10),
  role: 'admin'
}

const admins = [
  admin1
];

// In-memory storage for login challenges
const loginChallenges = new Map()

// Generate a secure, random salt for each login attempt
const generateLoginChallenge = (username) => {
  // Generate a cryptographically secure random string
  const challenge = crypto.randomBytes(32).toString('hex')
  
  // Store the challenge with a short expiration
  loginChallenges.set(username, {
    challenge,
    createdAt: Date.now()
  })

  return challenge
}

// Verify the login challenge
const verifyLoginChallenge = (username, clientChallenge) => {
  const storedChallenge = loginChallenges.get(username)
  
  // Remove the challenge after use to prevent replay attacks
  loginChallenges.delete(username)

  // Check if challenge exists and is recent (5 minutes max)
  if (!storedChallenge || 
      Date.now() - storedChallenge.createdAt > 5 * 60 * 1000 ||
      storedChallenge.challenge !== clientChallenge) {
    return false
  }

  return true
}

// Server-side password verification function
const verifyPassword = (inputHashedPassword, username, challenge) => {
  // First verify the login challenge
  if (!verifyLoginChallenge(username, challenge)) {
    console.log("Challenge verification failed")
    return false
  }

  const admin = admins.find(admin => admin.username === username)
  
  if (!admin) {
    console.log("User not found")
    return false
  }

  // Recreate the hashing process on the server
  const combinedInput = challenge + username + admin.originalPassword
  const serverHash = crypto.createHash('sha256')
    .update(combinedInput)
    .digest('hex')

  // Compare the client-sent hash with server-generated hash
  return serverHash === inputHashedPassword
}

export const loginAdmin = (req, res, callback) => {
  const { username, password, challenge } = req.body;
  const admin = admins.find(admin => admin.username === username);
  
  if (!admin) {
    console.log("Authentication failed: Username not found."  + username)
    // console.log("Not found username: " + username)
    return res.status(401).send('Invalid credentials');
  }

  // Verify the hashed password from the client
  const isPasswordValid = verifyPassword(password, username, challenge)
  
  if (!isPasswordValid) {
    // console.log("Authentication failed: Invalid password")
    console.log("Authentication failed: Not correct password: " + password)
    return res.status(401).send('Invalid credentials');
  }
  
  console.log("Authenticating... ")
  const token = jwt.sign({ 
    username: admin.username, 
    role: admin.role 
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  console.log("Generated token")
  
  if (callback) {
    callback({ username: admin.username, role: admin.role }, token)
  } else {
    res.json({ token: token });
  }
};

// Endpoint to get login challenge
export const getLoginChallenge = (req, res) => {
  const { username } = req.body
  const challenge = generateLoginChallenge(username)
  res.json({ challenge })
};
