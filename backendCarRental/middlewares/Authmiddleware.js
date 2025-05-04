import jwt from "jsonwebtoken";
const { verify } = jwt;

const authMiddleware = (req, res, next) => {
  // Check for Authorization header
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header found" });
  }
  
  // Extract token from Bearer format
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET);
    
    // Check token expiration (additional check)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      return res.status(401).json({ message: "Token has expired" });
    }
    
    // Set user in request object
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;