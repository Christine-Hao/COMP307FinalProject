/*
Location: /server/middleware/authMiddleware.js
to protect certain routes to ensure that only authenticated users can access them.
*/
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {

  // extracts JWT from Authorization header of the HTTP request
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer

  // check if the token exists.
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }


  try {

    // verifies the JWT using the secret key from the .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Now, we can add the decoded info to the req.user (token should contain userID)
    // req.user would be set to sth like: {userID: ActualID }
    req.user = decoded; 

    next(); 

    //console.log("Authmiddleware check is valid. The decoded token:", req.user);

  } catch (error) {
    // bad request
    res.status(400).json({ message: 'Invalid token. Request is blocked!' });
  }
}