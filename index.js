const express = require("express");
const http = require("http");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const cors = require("cors");

// Internal imports
const connectDB = require('./config/db');
const sockets= require('./socket/sockets.js');

// routes files
const router = require("./routes/api.js");

// Load env vars
// dotenv.config({ path: './config/config.env' });
// dotenv.config()
dotenv.config();

// Connect to database
connectDB();


const app = express();

// Body parser
app.use(express.json());



// create server through http
const httpServer = http.createServer(app);

// create socket server based on httpServer
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});


app.use(cors());

app.get("/", (req, res) => {
  // res.json({ data: "hello world from socket" });
  res.sendFile(__dirname + "/index.html");
});

// mount routes
app.use("/", router);


// socket
// on => Listening, emit => Speaking
io.on("connection", sockets);


// listen server
const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});