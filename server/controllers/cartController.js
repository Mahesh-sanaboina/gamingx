const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  const cartItems = await CartItem.find({ user: req.user._id }).populate('product');
  res.json(cartItems);
};

const addCartItem = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const existing = await CartItem.findOne({ user: req.user._id, product: productId });
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    await existing.save();
    return res.json(existing);
  }
  const cartItem = await CartItem.create({ user: req.user._id, product: productId, quantity });
  res.status(201).json(cartItem);
};

const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const cartItem = await CartItem.findById(req.params.id).populate('product');
  if (!cartItem || cartItem.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  cartItem.quantity = Math.max(1, Math.min(quantity, cartItem.product.stock));
  await cartItem.save();
  res.json(cartItem);
};

const removeCartItem = async (req, res) => {
  const cartItem = await CartItem.findById(req.params.id);
  if (!cartItem || cartItem.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  await cartItem.remove();
  res.json({ message: 'Cart item removed' });
};

module.exports = { getCart, addCartItem, updateCartItem, removeCartItem };
