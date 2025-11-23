const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" }
});

app.get("/", (req, res) => {
  res.send("Multiplayer Server is running!");
});

io.on("connection", socket => {
  console.log("A user connected:", socket.id);

  socket.on("chat", msg => {
    io.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log("Server running on PORT " + PORT));