const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Check if the request contains a valid JWT token
  const token = req.header("x-api-key");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, "IndividualProject");

    // Attach the user object to the request for further use
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
