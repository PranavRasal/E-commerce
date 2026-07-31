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

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');
    if (generated_signature === razorpay_signature) {
      res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
    // Verification logic would go here
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}

export { createPaymentIntent, verifyPayment };