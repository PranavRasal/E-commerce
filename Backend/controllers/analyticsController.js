import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

const getAnalyticsData = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({}); // Count all orders in the database
    const totalUsers = await User.countDocuments({role : 'user'}); // Count all users in the database
    const totalProducts = await Product.countDocuments({}); // Count all products in the database

    const orders = await Order.find({}) ; 

    const totalRevenue = orders.filter(order => order.status === 'delivered').reduce((acc, order) => acc + order.totalAmount, 0);
     // Calculate total revenue from delivered orders only



    // Analytics data retrieval logic would go here
    res.status(200).json({totalUsers, totalOrders,  totalProducts , totalRevenue  });
  } catch (error) {
    console.error('Error retrieving analytics data:', error);
    res.status(500).json({ error: 'Failed to retrieve analytics data' });
  }
};

export { getAnalyticsData };