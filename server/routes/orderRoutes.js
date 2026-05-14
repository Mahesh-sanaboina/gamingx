const express = require('express');
const { createPaymentIntent, confirmOrder, getOrders, getOrderById } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);
router.post('/checkout', createPaymentIntent);
router.post('/confirm', confirmOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

module.exports = router;
