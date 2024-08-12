const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const router = require("./routes");
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");
const cors = require("cors");

require("dotenv-flow").config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookies());
app.use(router);

const server = http.createServer(app);

const dataBase = process.env.MONGODB_URI;
mongoose
  .connect(dataBase, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("socketio", io);

io.on("connection", (socket) => {
  console.log(`a user connected with socket id: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.userId);
  });

  socket.on("user-connected", async (message) => {
    const sockets = await io.fetchSockets();
    const existingUserSocket = sockets.find(
      ({ userId }) => userId === message.user
    );
    if (existingUserSocket) {
      existingUserSocket.emit("new-session-started", {
        message: "You are already logged in on another device",
      });
    }
    socket.userId = message.user;
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("listening on *:5000");
});

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
