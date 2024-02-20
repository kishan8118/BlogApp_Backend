const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  // Get the token from the request headers or query string
  const token = req.headers["authorization"]?.split(" ")[1] || req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to req.user
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  authenticateToken,
};
