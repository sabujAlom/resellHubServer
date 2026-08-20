import { auth } from '../config/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import jwt from 'jsonwebtoken';
import { getUserCollection } from '../models/User.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, name, role, phone, location } = req.body;
    
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        role: role || 'buyer',
        phone,
        location
      }
    });
    
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Register error:", error);
    res.status(400).json({ success: false, message: error.message || "Registration failed" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const result = await auth.api.signInEmail({
      body: {
        email,
        password
      }
    });
    
    res.json({ success: true, result });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ success: false, message: error.message || "Login failed" });
  }
};

export const generateJWT = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });
    
    if (!session || !session.user) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    
    const sessionUser = session.user;

    // Fetch fresh user data from DB so role changes reflect immediately
    const userCollection = getUserCollection();
    const freshUser = await userCollection.findOne({ email: sessionUser.email });
    const role = freshUser?.role || sessionUser.role || 'buyer';

    const token = jwt.sign(
      { id: sessionUser.id || sessionUser._id, email: sessionUser.email, role }, 
      process.env.JWT_SECRET || "super_secret_jwt_key_at_least_32_characters_long", 
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
