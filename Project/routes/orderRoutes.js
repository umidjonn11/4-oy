const express = require('express');
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:orderId', getOrderById);
router.post('/', createOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

module.exports = router;
