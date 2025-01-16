import express from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:orderId', getOrderById);
router.post('/', createOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

export default router;
