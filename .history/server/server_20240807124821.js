const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const mongoose = require("mongoose");
const router = require("./routes");
const bodyParser = require("body-parser");
var cookies = require("cookie-parser");
const cors = require("cors");
require("dotenv-flow").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookies());
app.use(router);
app.use(cors());

const dataBase = process.env.MONGODB_URI;
mongoose
  .connect(dataBase, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(process.env.PORT || 5000, () => {
  console.log("listening on *:5000");
});

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
