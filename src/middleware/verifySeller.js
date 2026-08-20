import { getUserCollection } from '../models/User.js';

export const verifySeller = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    
    const user = await getUserCollection().findOne({ email: req.user.email });
    
    if (!user || (user.role !== 'seller' && user.role !== 'admin')) {
      return res.status(403).json({ message: "forbidden access" });
    }
    
    next();
  } catch (error) {
    console.error("verifySeller error:", error);
    return res.status(403).json({ message: "forbidden access" });
  }
};
