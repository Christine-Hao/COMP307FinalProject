// Location: /server/middleware/authMiddleware.js
/*
to protect certain routes to ensure that only authenticated users can access them.
*/

//import { verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {

  // extracts JWT from Authorization header of the HTTP request
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer

  // check if the token exists!
  if (!token) {
    // unauthorized
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }


  try {

    // 1. It verifies the JWT using the secret key from the .env file (i.e. the environment variable...)
    // 2. If the JWT is invalid or expired, it sends a 400 status response.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Now, we can add the decoded info to the req.user
    // The token should contain the userID
    // req.user would be set to sth like: {userID: ActualID }
    req.user = decoded; 

    // we can next() without any argument: current function is done, 
    // and move to the next middleware or route handler function
    //console.log("Authmiddle ware check is valid. The decoded token:", req.user);
    next(); 

  } catch (ex) {
    // bad request
    res.status(400).json({ message: 'Invalid token.' });
  }
}