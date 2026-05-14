const express = require('express');
const { getStats, getAllOrders, updateOrderStatus, getAllProducts } = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken, verifyAdmin);
router.get('/stats', getStats);
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);
router.get('/products', getAllProducts);

module.exports = router;
