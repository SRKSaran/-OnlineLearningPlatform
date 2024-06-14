// middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Check if Authorization header is present
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('Access Denied: No Authorization header');
  }

  // Split the Authorization header to extract the token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Denied: No token provided');
  }

  try {
    // Verify the token using JWT_SECRET from environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object for use in subsequent middleware or routes
    req.user = verified;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle any errors from JWT verification
    res.status(400).send('Invalid Token: ' + err.message);
  }
};
