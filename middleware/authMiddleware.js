const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "access_secret_key"); 
    req.userId = decoded.id; //Attaches the user’s ID to the request object
    next();                  // Token is valid, allow access
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};