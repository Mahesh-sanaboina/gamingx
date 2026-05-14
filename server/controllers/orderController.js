const Stripe = require('stripe');
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { generateOrderId } = require('../utils/generateOrderId');

const createStripeClient = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is required for payment processing');
  }
  return new Stripe(secretKey, {
    apiVersion: '2023-11-15',
  });
};

const createPaymentIntent = async (req, res) => {
  const stripe = createStripeClient();
  const { shipping, items } = req.body;
  if (!items || !items.length || !shipping) {
    return res.status(400).json({ message: 'Shipping details and items are required' });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

    const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: 'usd',
    metadata: {
      userId: req.user._id.toString(),
      orderId: generateOrderId(),
    },
    automatic_payment_methods: { enabled: true },
  });

  res.json({ clientSecret: paymentIntent.client_secret, amount: total, subtotal, tax });
};

const confirmOrder = async (req, res) => {
  const stripe = createStripeClient();
  const { paymentIntentId, shipping, items } = req.body;
  if (!paymentIntentId || !shipping || !items?.length) {
    return res.status(400).json({ message: 'Order payload missing' });
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (!paymentIntent || paymentIntent.status !== 'succeeded') {
    return res.status(400).json({ message: 'Payment not completed' });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const order = await Order.create({
    orderId: paymentIntent.metadata.orderId || generateOrderId(),
    user: req.user._id,
    items: items.map((item) => ({
      product: item.productId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    shipping,
    subtotal,
    tax,
    total,
    paymentStatus: 'paid',
    status: 'confirmed',
    paymentIntentId,
  });

  await CartItem.deleteMany({ user: req.user._id });
  res.status(201).json(order);
};

const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  if (!order || order.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

module.exports = { createPaymentIntent, confirmOrder, getOrders, getOrderById };
