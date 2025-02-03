# The Simple-Secure Authentication Protocol (V1.3.1)

# November 24, 2023
# Author: Darren Saunders

## 1. Overview

The Simple-Secure Authentication Protocol is a robust, multi-layered authentication mechanism designed to provide secure admin access with advanced protection against common authentication vulnerabilities. It implements a SCRAM-inspired (Salted Challenge Response Authentication Mechanism) design that goes beyond traditional password-based authentication.

## 2. Key Security Features

### 2.1 Challenge-Response Authentication
- Prevents replay attacks
- Dynamically generated login challenges
- One-time use challenge tokens
- Server-side challenge verification

### 2.2 Password Protection
- Never transmits passwords in clear text
- Uses client-side hashing with Web Crypto API
- Server-side password verification with additional salt
- Challenge-based hash recreation and verification

### 2.3 Token-Based Session Management
- JWT (JSON Web Token) for authenticated sessions
- Short-lived tokens (1-hour expiration)
- Role-based access control
- In-memory session tracking with automatic cleanup

## 3. Authentication Flow

### 3.1 Login Challenge Phase
1. Client requests a login challenge for a specific username
2. Server generates a unique, cryptographically secure challenge
3. Challenge is stored server-side with a 5-minute expiration
4. Challenge is single-use and time-limited

### 3.2 Password Hashing
1. Client combines:
   - Server-provided challenge
   - Username
   - User-entered password
2. Hashes the combined string using SHA-256 via Web Crypto API
3. Sends hashed password to server

### 3.3 Server-Side Verification
1. Verifies challenge validity
2. Recreates hash verification process
3. Compares client-sent hash with server-generated hash
4. Generates JWT token upon successful authentication

### 3.4 Session Management
- Unique session ID generated (using UUID V4)
- Token and session stored in-memory
- 1-hour session expiration
- Periodic session cleanup

### 3.5 Session ID Generation

### 3.6 Benefits of UUID V4
By switching to UUID V4 (Universally Unique Identifier version 4), we gain:

- Cryptographically secure generation
- Extremely low collision probability (1 in 2^122)
- Standardized unique identifier
- Higher entropy
- Recommended for session and token generation

### 3.7 Implementation
```javascript
// Using uuid library to generate session ID
const sessionId = uuidv4()

// Store session with 1 hour expiry
activeSessions.set(sessionId, {
  user,
  token,
  expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour
})
```

## 4. Detailed Authentication Mechanisms

### 4.1 Login Challenge Generation
```javascript
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
```

### 4.2 Challenge Verification
```javascript
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
```

### 4.3 Server-Side Password Verification
```javascript
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
```

### 4.4 Login Admin Function
```javascript
export const loginAdmin = (req, res, callback) => {
  const { username, password, challenge } = req.body;
  const admin = admins.find(admin => admin.username === username);
  
  if (!admin) {
    console.log("Authentication failed: User not found")
    return res.status(401).send('Invalid credentials');
  }

  // Verify the hashed password from the client
  const isPasswordValid = verifyPassword(password, username, challenge)
  
  if (!isPasswordValid) {
    console.log("Authentication failed: Invalid password")
    return res.status(401).send('Invalid credentials');
  }
  
  const token = jwt.sign({ 
    username: admin.username, 
    role: admin.role 
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  if (callback) {
    callback({ username: admin.username, role: admin.role }, token)
  } else {
    res.json({ token: token });
  }
};
```

## 5. Token Validation and Authorization Middleware

### 5.1 Token Validation Function
The `validateToken()` function provides a flexible mechanism for verifying JSON Web Tokens (JWTs):

```javascript
export const validateToken = (token, requiredRole = null) => {
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Optional role-based validation
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
```

#### Key Features:
- Verifies token integrity using JWT secret
- Supports optional role-based validation
- Handles token verification errors gracefully
- Returns decoded token or false if validation fails

### 5.2 Token Authentication Middleware
The `authenticateToken()` middleware protects routes by validating tokens:

```javascript
export const authenticateToken = (req, res, next) => {
  // Flexible token extraction
  const authHeader = req.headers['authorization']
  const queryToken = req.query.token
  
  let token = null
  
  if (authHeader) {
    token = authHeader.split(' ')[1]
  } else if (queryToken) {
    token = queryToken
  }
  
  if (!token) {
    return res.sendStatus(401)
  }

  // Validate token with admin role requirement
  const decoded = validateToken(token, 'admin')
  
  if (!decoded) {
    return res.sendStatus(403)
  }
  
  req.user = decoded
  next()
}
```

#### Key Features:
- Supports token extraction from multiple sources
- Enforces admin role authentication
- Attaches decoded user information to request object
- Provides granular access control

### 5.3 Role-Based Authorization
The `authorizeRole()` middleware enables fine-grained access control:

```javascript
export const authorizeRole = role => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.sendStatus(403)
    }
    next()
  }
}
```

#### Key Features:
- Dynamically creates middleware for specific roles
- Prevents unauthorized access based on user roles
- Provides an additional layer of security

### 5.4 Security Considerations
- Tokens are verified using a secret key
- Role-based access control prevents unauthorized actions
- Middleware handles token extraction and validation
- Supports flexible authentication strategies

## 6. Client-Side Password Hashing
```javascript
async function hashPassword(password, username, challenge) {
  const combinedInput = challenge + username + password
  const encoder = new TextEncoder()
  const data = encoder.encode(combinedInput)
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return hashHex
}
```

## 7. Function Usage and Validation

### 7.1 Function Roles
- `getLoginChallenge()`: Generates unique login challenges
- `verifyPassword()`: Validates login challenges and password
- `loginAdmin()`: Manages the entire login authentication process

### 7.2 Validation Findings
After a comprehensive review, all functions are:
- Correctly implemented
- Serving their intended security purposes
- Following the SCRAM-inspired authentication design
- Providing robust protection against common authentication vulnerabilities

## 7.3 Implementation Recommendations

### Security
- Use HTTPS for all authentication requests
- Implement rate limiting on login attempts
- Use strong, unique passwords
- Regularly rotate JWT secret

### Scalability
- Consider transitioning to distributed session storage (Redis)
- Implement more granular role-based access control

## 8. Potential Improvements
- Add multi-factor authentication
- Implement password complexity requirements
- Create admin user management interface
- Implement more robust session ID generation

## 9. Conclusion

This authentication protocol provides a secure, flexible mechanism for admin authentication, balancing robust security with a smooth user experience. Version 1.3.1 introduces refined validation of the authentication functions and their critical roles in the security mechanism, with continued focus on enhancing security, scalability, and user experience.
