import { readDB, writeDB } from "../database/index.js";

export const getAllProducts = async (req, res) => {
  const products = await readDB('products');
  if (!products.ok) return res.status(500).json({ message: 'Error reading products database' });

  res.status(200).json(products.data);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const products = await readDB('products');
  if (!products.ok) return res.status(500).json({ message: 'Error reading products database' });

  const product = products.data.find(p => p.id === parseInt(productId));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;

  if (!name || !price || !description || !stock) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const products = await readDB('products.json');
  if (!products.ok) return res.status(500).json({ message: 'Error reading products database' });

  const newProduct = {
    id: products.data.length + 1,
    name,
    price,
    description,
    stock,
  };

  products.data.push(newProduct);
  const writeResult = await writeDB('products', products.data);
  if (!writeResult.ok) return res.status(500).json({ message: 'Error writing to products database' });

  res.status(201).json(newProduct);
};

// Update product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, description, stock } = req.body;

  const products = await readDB('products');
  if (!products.ok) return res.status(500).json({ message: 'Error reading products database' });

  const productIndex = products.data.findIndex(p => p.id === parseInt(productId));
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const updatedProduct = { ...products.data[productIndex], name, price, description, stock };
  products.data[productIndex] = updatedProduct;

  const writeResult = await writeDB('products', products.data);
  if (!writeResult.ok) return res.status(500).json({ message: 'Error writing to products database' });

  res.status(200).json(updatedProduct);
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  
  const products = await readDB('products');
  if (!products.ok) return res.status(500).json({ message: 'Error reading products database' });

  const productIndex = products.data.findIndex(p => p.id === parseInt(productId));
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  // Delete associated orders
  const orders = await readDB('orders');
  if (orders.ok) {
    const updatedOrders = orders.data.filter(order => order.productId !== parseInt(productId));
    await writeDB('orders', updatedOrders);
  }

  products.data.splice(productIndex, 1);
  const writeResult = await writeDB('products', products.data);
  if (!writeResult.ok) return res.status(500).json({ message: 'Error writing to products database' });

  res.status(200).json({ message: 'Product deleted' });
};
