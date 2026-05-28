import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {

    // Get Authorization Header
    const authHeader = req.headers.authorization;

    // Check Token
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save User ID In Request
    req.userId = decoded.userId;

    // Continue
    next();
  } catch (error) {
    console.log(error);
    
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;