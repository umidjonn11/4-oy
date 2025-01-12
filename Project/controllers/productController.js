const fs = require('fs');
const path = require('path');

const readDataFromFile = (filename) => {
  const data = fs.readFileSync(path.join(__dirname, '../data', filename), 'utf8');
  return JSON.parse(data);
};

const writeDataToFile = (filename, data) => {
  fs.writeFileSync(path.join(__dirname, '../data', filename), JSON.stringify(data, null, 2));
};

// Get All Products
const getAllProducts = (req, res) => {
  const products = readDataFromFile('products.json');
  res.json(products);
};

// Get Product by ID
const getProductById = (req, res) => {
  const { productId } = req.params;
  const products = readDataFromFile('products.json');
  const product = products.find(p => p.id === parseInt(productId));

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Create Product
const createProduct = (req, res) => {
  const { name, price, description, stock } = req.body;

  const products = readDataFromFile('products.json');
  const newProduct = { id: products.length + 1, name, price, description, stock };
  products.push(newProduct);
  writeDataToFile('products.json', products);

  res.json(newProduct);
};

// Update Product
const updateProduct = (req, res) => {
  const { productId } = req.params;
  const { name, price, description, stock } = req.body;
  const products = readDataFromFile('products.json');

  const productIndex = products.findIndex(p => p.id === parseInt(productId));
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = { id: parseInt(productId), name, price, description, stock };
  products[productIndex] = updatedProduct;
  writeDataToFile('products.json', products);

  res.json(updatedProduct);
};

// Delete Product
const deleteProduct = (req, res) => {
  const { productId } = req.params;
  const products = readDataFromFile('products.json');
  
  const updatedProducts = products.filter(p => p.id !== parseInt(productId));
  writeDataToFile('products.json', updatedProducts);
  
  res.json({ message: 'Product deleted' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
