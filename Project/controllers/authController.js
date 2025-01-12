const fs = require('fs');
const path = require('path');

const readDataFromFile = (filename) => {
  const data = fs.readFileSync(path.join(__dirname, '../data', filename), 'utf8');
  return JSON.parse(data);
};

const writeDataToFile = (filename, data) => {
  fs.writeFileSync(path.join(__dirname, '../data', filename), JSON.stringify(data, null, 2));
};

const register = (req, res) => {
  const { name, email, password } = req.body;

  const users = readDataFromFile('users.json');
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  writeDataToFile('users.json', users);

  res.json(newUser);
};

// Login
const login = (req, res) => {
  const { email, password } = req.body;
  const users = readDataFromFile('users.json');
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  register,
  login
};
