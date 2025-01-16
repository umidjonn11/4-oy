import { readDB, writeDB } from "../database/index.js";

// Register a new user
export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const users = await readDB('users');
  if (!users.ok) return res.status(500).json({ message: 'Error reading users database' });

  const existingUser = users.data.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const newUser = {
    id: users.data.length + 1,
    name,
    email,
  };

  users.data.push(newUser);
  const writeResult = await writeDB('users', users.data);
  if (!writeResult.ok) return res.status(500).json({ message: 'Error writing to users database' });

  return res.status(201).json(newUser);
};

// Login a user
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }

  const users = await readDB('users');
  if (!users.ok) return res.status(500).json({ message: 'Error reading users database' });

  const user = users.data.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.status(200).json(user);
};
