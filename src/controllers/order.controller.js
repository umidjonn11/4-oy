import { readDB, writeDB } from "../database/index.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  const orders = await readDB('orders');
  if (!orders.ok) return res.status(500).json({ message: 'Error reading orders database' });

  res.status(200).json(orders.data);
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const orders = await readDB('orders');
  if (!orders.ok) return res.status(500).json({ message: 'Error reading orders database' });

  const order = orders.data.find(o => o.id === parseInt(orderId));
  if (!order) return res.status(404).json({ message: 'Order not found' });

  res.status(200).json(order);
};

// Create a new order
export const createOrder = async (req, res) => {
  const { userId, productId, total, status } = req.body;

  if (!userId || !productId || !total || !status) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const orders = await readDB('orders');
  if (!orders.ok) return res.status(500).json({ message: 'Error reading orders database' });

  const newOrder = {
    id: orders.data.length + 1,
    userId,
    productId,
    total,
    status,
  };

  orders.data.push(newOrder);
  const writeResult = await writeDB('orders', orders.data);
  if (!writeResult.ok) return res.status(500).json({ message: 'Error writing to orders database' });

  res.status(201).json(newOrder);
};

// Update order status
export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const orders = await readDB('orders');
  if (!orders.ok) return res.status(500).json({ message: 'Error reading orders database' });

  const orderIndex = orders.data.findIndex(o => o.id === parseInt(orderId));
  if (orderIndex === -1) return res.status(404).json({ message: 'Order not found' });

  orders.data[orderIndex].status = status;

  const writeResult = await writeDB('orders', orders.data);
  if (!writeResult.ok) return res.status(500).json({ message: 'Error writing to orders database' });

  res.status(200).json(orders.data[orderIndex]);
};

// Delete order
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const orders = await readDB('orders');
  if (!orders.ok) return res.status(500).json({ message: 'Error reading orders database' });

  const orderIndex = orders.data.findIndex(o => o.id === parseInt(orderId));
  if (orderIndex === -1) return res.status(404).json({ message: 'Order not found' });

  orders.data.splice(orderIndex, 1);

  const writeResult = await writeDB('orders', orders.data);
  if (!writeResult.ok) return res.status(500).json({ message: 'Error writing to orders database' });

  res.status(200).json({ message: 'Order deleted' });
};
