import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
        amount: amount * 100, // Amount in paise (1 INR = 100 paise)
        currency: "INR",
        receipt : crypto.randomBytes(10).toString('hex') // Generate a random receipt ID
    };

    const paymentIntent = await instance.orders.create(options);
    res.status(200).json({ paymentIntent });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
}