import Order from '../models/order.model.js';
import sendEmail from '../utils/sendEmail.js';

const createOrder = async (req, res) => {
    try {
        const { products, address, totalAmount, paymentid } = req.body;

        if (!products || !address || totalAmount === undefined || !paymentid) {
            return res.status(400).json({ message: 'Missing required order fields' });
        }

        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const order = await Order.create({
            user: userId,
            products,
            address,
            totalAmount,
            paymentid
        });

        const firstProduct = order.products?.[0];
        const productName = firstProduct?.productid?.name || 'your selected product';
        const message = `Your order with ID ${order._id} of product ${productName} has been successfully placed. Total Amount: ${totalAmount}. Thank you for shopping with us!`;

        await sendEmail(req.user.email, 'Order Placed', message);
        res.status(201).json({ order, message: 'Order created and email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('products.productid', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user._id}).populate('user', 'name email').populate('products.productid', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
        
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = req.body.status;
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createOrder, getAllOrders, getAllUserOrders, updateOrderStatus };