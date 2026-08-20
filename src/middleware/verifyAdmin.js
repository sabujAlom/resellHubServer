import { getUserCollection } from '../models/User.js';

export const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    
    const user = await getUserCollection().findOne({ email: req.user.email });
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "forbidden access" });
    }
    
    next();
  } catch (error) {
    console.error("verifyAdmin error:", error);
    return res.status(403).json({ message: "forbidden access" });
  }
};
