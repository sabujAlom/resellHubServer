import jwt from 'jsonwebtoken';

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "super_secret_jwt_key_at_least_32_characters_long");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("verifyJWT error:", error);
    return res.status(401).json({ message: "unauthorized access" });
  }
};
