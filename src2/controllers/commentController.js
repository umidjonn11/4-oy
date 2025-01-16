import { readDB, writeDB } from "../database/index.js";

// Register a new user
export const registerComments = async (req, res) => {
  const { postId, content, authorId } = req.body;

  if (!postId || !content || !authorId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const users = await readDB("comments");
  if (!users.ok)
    return res.status(500).json({ message: "Error reading users database" });

  const existingUser = users.data.find((user) => user.content === content);
  if (existingUser) {
    return res.status(409).json({ message: "Content already registered" });
  }

  const newUser = {
    id: users.data.length + 1,
    postId,
    content,
    authorId,
  };

  users.data.push(newUser);
  const writeResult = await writeDB("comments", users.data);
  if (!writeResult.ok)
    return res.status(500).json({ message: "Error writing to comments database" });

  return res.status(201).json(newUser);
};
//Get All Users
export const GetAllComments = async (req, res) => {
  const users = await readDB("comments");
  if (!users.ok) {
    res.status(500).json({ message: "Error reading comments database" });
  }
  res.status(200).send(users);
};
//Get user by ID
export const GetOneComment = async (req, res) => {
  const usersId = req.params.id;

  if (isNaN(usersId)) {
    return res.status(400).json({ message: "Invalid blog ID format!" });
  }

  const users = await readDB("comments");
  if (!users.ok) {
    return res.status(500).json({ message: "Error reading users database" });
  }

  const user = users.data.find((user) => user.id === parseInt(usersId));

  if (!user) {
    return res.status(404).json({ message: "Blog not found!" });
  }

  return res.status(200).json(user);
};

//Update User
export const UpdateComment = async (req, res) => {
  const userID = req.params.id;

  if (isNaN(userID)) {
    return res.status(400).json({ message: "Invalid blog ID format!" });
  }

  const { postId, content, authorId } = req.body;

  if (!postId && !content && !authorId) {
    return res
      .status(400)
      .json({ message: "At least one field to update is required!" });
  }

  const users = await readDB("comments");
  if (!users.ok) {
    return res.status(500).json({ message: "Error reading comments database" });
  }

  const userIndex = users.data.findIndex(
    (user) => user.id === parseInt(userID)
  );

  if (userIndex === -1) {
    return res.status(404).json({ message: "Blog not found!" });
  }

  const updatedUser = users.data[userIndex];

  if (postId) updatedUser.postId = postId;
  if (content) updatedUser.content = content;
  if (authorId) updatedUser.authorId = authorId;

  const writeResult = await writeDB("comments", users.data);
  if (!writeResult.ok) {
    return res.status(500).json({ message: "Error writing to comments database" });
  }

  return res.status(200).send(updatedUser);
};
//delete user by Id
export const deleteCommentbyId = async (req, res) => {
  const userId = req.params.id;
  if (isNaN(userId)) {
    req.status(400).send("Error invalid id");
  }
  const users = await readDB("comments");
  if (!users.ok) {
    res.status(500).send("Error on read comments dabase!");
  }
  const deletedUsers = users.data.findIndex((p) => p.id !== parseInt(userId));
  if (deletedUsers === -1) {
    res.status(400).send("Blog is not found!");
  }
  const newObject = users.data.splice(deletedUsers, 1);
  const updated = await writeDB("comments", newObject);
  res.status(200).send(updated);
};
