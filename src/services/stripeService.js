import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecret = process.env.STRIPE_SECRET_KEY || "placeholder_stripe_key";
export const stripe = new Stripe(stripeSecret);

export const createPaymentIntentService = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents (Stripe expects integers in minimal unit)
      currency: 'usd',
      payment_method_types: ['card'],
    });
    return paymentIntent;
  } catch (error) {
    console.error("Stripe createPaymentIntent error:", error);
    throw error;
  }
};
