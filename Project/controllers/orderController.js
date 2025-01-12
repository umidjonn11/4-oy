const fs = require('fs');
const path = require('path');

const readDataFromFile = (filename) => {
  const data = fs.readFileSync(path.join(__dirname, '../data', filename), 'utf8');
  return JSON.parse(data);
};

const writeDataToFile = (filename, data) => {
  fs.writeFileSync(path.join(__dirname, '../data', filename), JSON.stringify(data, null, 2));
};

// Get All Orders
const getAllOrders = (req, res) => {
  const orders = readDataFromFile('orders.json');
  res.json(orders);
};

// Get Order by ID
const getOrderById = (req, res) => {
  const { orderId } = req.params;
  const orders = readDataFromFile('orders.json');
  const order = orders.find(o => o.id === parseInt(orderId));

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// Create Order
const createOrder = (req, res) => {
  const { userId, productId, total, status } = req.body;

  const orders = readDataFromFile('orders.json');
  const newOrder = { id: orders.length + 1, userId, productId, total, status };
  orders.push(newOrder);
  writeDataToFile('orders.json', orders);

  res.json(newOrder);
};

// Update Order
const updateOrder = (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const orders = readDataFromFile('orders.json');

  const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const updatedOrder = { ...orders[orderIndex], status };
  orders[orderIndex] = updatedOrder;
  writeDataToFile('orders.json', orders);

  res.json(updatedOrder);
};

const deleteOrder = (req, res) => {
  const { orderId } = req.params;
  const orders = readDataFromFile('orders.json');
  
  const updatedOrders = orders.filter(o => o.id !== parseInt(orderId));
  writeDataToFile('orders.json', updatedOrders);
  
  res.json({ message: 'Order deleted' });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
