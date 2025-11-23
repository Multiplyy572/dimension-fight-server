const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" }
});

// Những người đang online
let onlineUsers = {};

// Khi có người kết nối
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Người dùng đăng nhập
  socket.on("login", (username) => {
    onlineUsers[socket.id] = username;
    console.log(username, "đã đăng nhập");

    io.emit("onlineUsers", Object.values(onlineUsers));
  });

  // Người dùng ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete onlineUsers[socket.id];
    io.emit("onlineUsers", Object.values(onlineUsers));
  });
});

// Server chạy
http.listen(3000, () => {
  console.log("🔥 Server is running on port 3000");
});
