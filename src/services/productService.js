import { getProductCollection } from '../models/Product.js';
import { ObjectId } from 'mongodb';

const toObjectId = (id) => {
  try {
    return new ObjectId(id);
  } catch (err) {
    return id;
  }
};

export const findProducts = async (query, sortOption, skip, limitNum) => {
  return await getProductCollection().find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum)
    .toArray();
};

export const countProducts = async (query) => {
  return await getProductCollection().countDocuments(query);
};

export const findProductById = async (id) => {
  return await getProductCollection().findOne({ _id: toObjectId(id) });
};

export const insertProduct = async (product) => {
  return await getProductCollection().insertOne(product);
};

export const updateProductById = async (id, updates) => {
  return await getProductCollection().updateOne(
    { _id: toObjectId(id) },
    { $set: updates }
  );
};

export const deleteProductById = async (id) => {
  return await getProductCollection().deleteOne({ _id: toObjectId(id) });
};
