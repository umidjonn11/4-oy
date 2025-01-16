import { readDB, writeDB } from "../database/index.js";

// Register a new user
export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const users = await readDB("users");
  if (!users.ok)
    return res.status(500).json({ message: "Error reading users database" });

  const existingUser = users.data.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const newUser = {
    id: users.data.length + 1,
    name,
    email,
    password,
  };

  users.data.push(newUser);
  const writeResult = await writeDB("users", users.data);
  if (!writeResult.ok)
    return res.status(500).json({ message: "Error writing to users database" });

  return res.status(201).json(newUser);
};
//Get All Users
export const GetAllUsers = async (req, res) => {
  const users = await readDB("users");
  if (!users.ok) {
    res.status(500).json({ message: "Error reading users database" });
  }
  res.status(200).send(users);
};
//Get user by ID
export const GetOneUser = async (req, res) => {
  const usersId = req.params.id;

  if (isNaN(usersId)) {
    return res.status(400).json({ message: "Invalid user ID format!" });
  }

  const users = await readDB("users");
  if (!users.ok) {
    return res.status(500).json({ message: "Error reading users database" });
  }

  const user = users.data.find((user) => user.id === parseInt(usersId));

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  return res.status(200).json(user);
};

//Update User
export const UpdateUser = async (req, res) => {
  const userID = req.params.id;

  if (isNaN(userID)) {
    return res.status(400).json({ message: "Invalid user ID format!" });
  }

  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    return res
      .status(400)
      .json({ message: "At least one field to update is required!" });
  }

  const users = await readDB("users");
  if (!users.ok) {
    return res.status(500).json({ message: "Error reading users database" });
  }

  const userIndex = users.data.findIndex(
    (user) => user.id === parseInt(userID)
  );

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found!" });
  }

  const updatedUser = users.data[userIndex];

  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email;
  if (password) updatedUser.password = password;

  const writeResult = await writeDB("users", users.data);
  if (!writeResult.ok) {
    return res.status(500).json({ message: "Error writing to users database" });
  }

  return res.status(200).send(updatedUser);
};
//delete user by Id
export const deleteById = async (req, res) => {
  const userId = req.params.id;
  if (isNaN(userId)) {
    req.status(400).send("Error invalid id");
  }
  const users = await readDB("users");
  if (!users.ok) {
    res.status(500).send("Error on read users dabase!");
  }
  const deletedUsers = users.data.findIndex((p) => p.id !== parseInt(userId));
  if (deletedUsers === -1) {
    res.status(400).send("User is not found!");
  }
  const newObject = users.data.splice(deletedUsers, 1);
  const updated = await writeDB("users", newObject);
  res.status(200).send(updated);
};
// Login a user
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }

  const users = await readDB("users");
  if (!users.ok)
    return res.status(500).json({ message: "Error reading users database" });

  const user = users.data.find((u) => u.email === email);

  //   console.log(Boolean(!user));
  //   console.log(Boolean(user.password !== password));

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.status(200).json(user);
};
