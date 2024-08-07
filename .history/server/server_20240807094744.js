const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const mongoose = require('mongoose');

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const dataBase = require('./config/keys').mongoURI;
mongoose
  .connect(dataBase, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


const io = socketIo.listen(server);


server.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:5000');
});