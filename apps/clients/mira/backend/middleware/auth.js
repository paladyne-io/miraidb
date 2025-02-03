import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'

const __dirname = path.resolve()
// const pathToEnvFile = __dirname.endsWith('backend')
// ? path.join(__dirname, '.env')
// : path.join(__dirname, 'backend', '.env')

dotenv.config() //{ path: pathToEnvFile }

// Token validation function that can be used flexibly
export const validateToken = (token, requiredRole = null) => {
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // If a specific role is required, check it
    if (requiredRole && decoded.role !== requiredRole) {
      console.log(`Token validation failed: Role ${decoded.role} does not match required role ${requiredRole}`)
      return false
    }
    
    return decoded
  } catch (error) {
    console.log('Token validation error:', error.message)
    return false
  }
}

// Existing middleware for route protection
export const authenticateToken = (req, res, next) => {
  // Check for token in Authorization header or query parameters
  const authHeader = req.headers['authorization']
  const queryToken = req.query.token

  console.log("queryToken" , queryToken)
  console.log("authHeader" , JSON.stringify(authHeader))
  
  let token = null
  
  if (authHeader) {
    token = authHeader.split(' ')[1]
  } else if (queryToken) {
    token = queryToken
  }

  console.log('Got token: ' + token)
  
  if (!token) {
    console.log('No token found')
    return res.sendStatus(401)
  }

  const decoded = validateToken(token, 'admin')
  
  if (!decoded) {
    console.log('Token validation failed')
    return res.sendStatus(403)
  }
  
  req.user = decoded
  next()
}

// Role-specific authorization middleware
export const authorizeRole = role => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.sendStatus(403)
    }
    next()
  }
}
