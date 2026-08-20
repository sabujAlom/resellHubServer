import { createPaymentIntentService, stripe } from '../services/stripeService.js';
import { findPayments, savePaymentRecord } from '../services/paymentService.js';
import { getDb } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { productId, buyerId, orderId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: "productId is required" });
    }

    const db = getDb();
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name || product.title || "Second-hand Product",
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${clientUrl}/dashboard/buyer/my-orders?payment_success=true&session_id={CHECKOUT_SESSION_ID}&product_id=${productId}&order_id=${orderId || ''}&buyer_id=${buyerId || ''}`,
      cancel_url: `${clientUrl}/products/${productId}?payment_cancelled=true`,
      metadata: {
        productId,
        buyerId: buyerId || '',
        orderId: orderId || ''
      }
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Error creating stripe checkout session:", error);
    next(error);
  }
};

export const verifySession = async (req, res, next) => {
  try {
    const { session_id, product_id, order_id, buyer_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ success: false, message: "session_id is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === 'paid') {
      const db = getDb();
      const transactionId = session.payment_intent;
      
      // Check if payment already exists
      const existing = await db.collection('payments').findOne({ transactionId });
      if (existing) {
        return res.json({ success: true, message: "Already processed", payment: existing });
      }

      const product = await db.collection('products').findOne({ _id: new ObjectId(product_id) });
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      const newPayment = {
        transactionId,
        orderId: order_id ? new ObjectId(order_id) : null,
        productId: new ObjectId(product_id),
        buyerId: buyer_id ? new ObjectId(buyer_id) : null,
        amount: product.price,
        paymentStatus: 'paid',
        paymentMethod: 'card',
        paymentDate: new Date()
      };

      const result = await db.collection('payments').insertOne(newPayment);
      
      // Update product status
      await db.collection('products').updateOne(
        { _id: new ObjectId(product_id) },
        { $set: { status: 'sold', advertised: false } }
      );

      // Update order status if order_id is present
      if (order_id) {
        await db.collection('orders').updateOne(
          { _id: new ObjectId(order_id) },
          { $set: { paymentStatus: 'paid', transactionId } }
        );
      }

      res.json({ success: true, paymentId: result.insertedId, payment: newPayment });
    } else {
      res.status(400).json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error verifying stripe session:", error);
    next(error);
  }
};

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Valid amount is required" });
    }
    const paymentIntent = await createPaymentIntentService(amount);
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (req, res, next) => {
  try {
    const { transactionId, orderId, productId, buyerId, amount, paymentMethod } = req.body;
    
    const newPayment = {
      transactionId,
      orderId,
      productId,
      buyerId,
      amount: parseFloat(amount),
      paymentStatus: 'paid',
      paymentMethod: paymentMethod || 'card',
      paymentDate: new Date()
    };
    
    const result = await savePaymentRecord(newPayment);
    if (result.duplicate) {
      return res.status(200).json({ success: true, paymentId: result.insertedId, message: "Payment already processed", payment: newPayment });
    }
    
    res.status(201).json({ success: true, paymentId: result.insertedId, payment: newPayment });
  } catch (error) {
    next(error);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const { buyerId } = req.query;
    const query = {};
    
    let targetBuyerId = buyerId;
    if (!targetBuyerId && req.user && req.user.role === 'buyer') {
      targetBuyerId = req.user.id || req.user._id;
    }

    if (targetBuyerId) {
      try {
        query.buyerId = { $in: [targetBuyerId.toString(), new ObjectId(targetBuyerId)] };
      } catch (err) {
        query.buyerId = targetBuyerId;
      }
    }
    
    const payments = await findPayments(query);
    res.json(payments);
  } catch (error) {
    next(error);
  }
};
