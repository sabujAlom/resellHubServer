import { findOrders, insertOrder, updateOrderById } from '../services/orderService.js';

export const getOrders = async (req, res, next) => {
  try {
    const { buyerId, sellerId } = req.query;
    
    const query = {};
    if (buyerId) {
      query.buyerId = buyerId;
    }
    if (sellerId) {
      query.sellerId = sellerId;
    }
    
    if (!buyerId && !sellerId && req.user) {
      const currentUserId = req.user.id || req.user._id;
      if (req.user.role === 'buyer') {
        query.buyerId = currentUserId;
      } else if (req.user.role === 'seller') {
        query.sellerId = currentUserId;
      }
    }
    
    const orders = await findOrders(query);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { buyerId, sellerId, productId, title, price, image, quantity = 1 } = req.body;
    
    const newOrder = {
      buyerId,
      sellerId,
      productId,
      title,
      price: parseFloat(price),
      image,
      quantity: parseInt(quantity),
      amount: parseFloat(price) * parseInt(quantity),
      paymentStatus: 'unpaid',
      orderStatus: 'pending',
      createdAt: new Date()
    };
    
    const result = await insertOrder(newOrder);
    res.status(201).json({ success: true, insertedId: result.insertedId, order: newOrder });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    delete updates._id;
    
    await updateOrderById(id, updates);
    res.json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    next(error);
  }
};
