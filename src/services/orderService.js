import { getOrderCollection } from '../models/Order.js';
import { ObjectId } from 'mongodb';

const toObjectId = (id) => {
  try {
    return new ObjectId(id);
  } catch (err) {
    return id;
  }
};

export const findOrders = async (query) => {
  return await getOrderCollection().find(query).toArray();
};

export const insertOrder = async (order) => {
  return await getOrderCollection().insertOne(order);
};

export const updateOrderById = async (id, updates) => {
  return await getOrderCollection().updateOne(
    { _id: toObjectId(id) },
    { $set: updates }
  );
};
