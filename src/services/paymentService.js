import { getPaymentCollection } from '../models/Payment.js';
import { getOrderCollection } from '../models/Order.js';
import { getProductCollection } from '../models/Product.js';
import { ObjectId } from 'mongodb';

const toObjectId = (id) => {
  try {
    return new ObjectId(id);
  } catch (err) {
    return id;
  }
};

export const findPayments = async (query) => {
  return await getPaymentCollection().find(query).toArray();
};

export const savePaymentRecord = async (payment) => {
  // Prevent duplicate payment entries
  const existingTx = await getPaymentCollection().findOne({ transactionId: payment.transactionId });
  if (existingTx) {
    return { success: false, duplicate: true, insertedId: existingTx._id };
  }

  const existingOrder = await getPaymentCollection().findOne({ orderId: payment.orderId });
  if (existingOrder) {
    return { success: false, duplicate: true, insertedId: existingOrder._id };
  }

  const result = await getPaymentCollection().insertOne(payment);
  
  // Update order status to paid
  await getOrderCollection().updateOne(
    { _id: toObjectId(payment.orderId) },
    { $set: { paymentStatus: 'paid', orderStatus: 'paid' } }
  );
  
  // Update product status to sold
  await getProductCollection().updateOne(
    { _id: toObjectId(payment.productId) },
    { $set: { status: 'sold' } }
  );
  
  return result;
};
