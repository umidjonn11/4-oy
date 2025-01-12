const fs = require('fs');
const path = require('path');

const readDataFromFile = (filename) => {
  const data = fs.readFileSync(path.join(__dirname, '../data', filename), 'utf8');
  return JSON.parse(data);
};

const writeDataToFile = (filename, data) => {
  fs.writeFileSync(path.join(__dirname, '../data', filename), JSON.stringify(data, null, 2));
};

// Get All Users
const getAllUsers = (req, res) => {
  const users = readDataFromFile('users.json');
  res.json(users);
};

// Get User by ID
const getUserById = (req, res) => {
  const { userId } = req.params;
  const users = readDataFromFile('users.json');
  const user = users.find(u => u.id === parseInt(userId));

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Update User
const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;
  const users = readDataFromFile('users.json');

  const userIndex = users.findIndex(u => u.id === parseInt(userId));
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = { id: parseInt(userId), name, email };
  users[userIndex] = updatedUser;
  writeDataToFile('users.json', users);

  res.json(updatedUser);
};

// Delete User
const deleteUser = (req, res) => {
  const { userId } = req.params;
  const users = readDataFromFile('users.json');
  
  const updatedUsers = users.filter(u => u.id !== parseInt(userId));
  writeDataToFile('users.json', updatedUsers);
  
  res.json({ message: 'User deleted' });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
