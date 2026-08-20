import { ObjectId } from 'mongodb';
import { getUserCollection } from '../models/User.js';

export const getAllUsers = async (req, res, next) => {
  try {
    // Admin only or verified token
    const users = await getUserCollection().find({}).toArray();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, status, verified } = req.body;
    
    const updateDoc = {};
    if (role !== undefined) updateDoc.role = role;
    if (status !== undefined) updateDoc.status = status;
    if (verified !== undefined) updateDoc.verified = verified;
    
    let result = await getUserCollection().updateOne(
      { _id: id },
      { $set: updateDoc }
    );
    
    if (result.matchedCount === 0) {
      try {
        result = await getUserCollection().updateOne(
          { _id: new ObjectId(id) },
          { $set: updateDoc }
        );
      } catch (err) {}
    }
    
    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    let result = await getUserCollection().deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      try {
        result = await getUserCollection().deleteOne({ _id: new ObjectId(id) });
      } catch (err) {}
    }
    
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
