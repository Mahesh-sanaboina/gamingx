const express = require('express');
const { getCart, addCartItem, updateCartItem, removeCartItem } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);
router.get('/', getCart);
router.post('/', addCartItem);
router.put('/:id', updateCartItem);
router.delete('/:id', removeCartItem);

module.exports = router;
