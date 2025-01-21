import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

let users = {};

io.on("connection", (socket) => {
  let username = "";

  socket.on("set username", (name) => {
    username = name;
    users[socket.id] = username;

    socket.emit("chat message", {
      username: "System",
      content: `Welcome ${username}!`,
      time: new Date().toLocaleTimeString(),
    });

    socket.broadcast.emit("chat message", {
      username: "System",
      content: `${username} has joined the chat.`,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("chat message", (msg) => {
    const { username, content, time } = msg;

    io.emit("chat message", {
      username: users[socket.id] || "Anonymous",
      content,
      time,
    });
  });

  socket.on("disconnect", () => {
    if (username) {
      socket.broadcast.emit("chat message", {
        username: "System",
        content: `${username} has left the chat.`,
        time: new Date().toLocaleTimeString(),
      });
    }

    delete users[socket.id];
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
