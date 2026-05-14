const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getStats = async (req, res) => {
  const totalRevenue = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, revenue: { $sum: '$total' }, orders: { $sum: 1 } } },
  ]);
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const products = await Product.countDocuments();

  res.json({
    totalRevenue: totalRevenue[0]?.revenue || 0,
    totalUsers,
    totalOrders,
    totalProducts: products,
  });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user');
  res.json(orders);
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  order.status = status || order.status;
  await order.save();
  res.json(order);
};

const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

module.exports = { getStats, getAllOrders, updateOrderStatus, getAllProducts };
