// Location: /server/middleware/authMiddleware.js
/*
to protect certain routes to ensure that only authenticated users can access them.
*/

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // extracts JTW from Authorization header of the HTTP request
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // It verifies the JWT using the secret key from the .env file.
    // If the JWT is invalid or expired, it sends a 400 status response.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user payload to request object
    next(); // Proceed to the next middleware/route handler
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};