const express = require("express");
const http = require("http");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require("socket.io");

// Internal imports
const connectDB = require('./config/db');

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

// socket Middleware 
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   console.log(token);

//   try{
//       var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//       next();
//   }catch(e){   
//   }
// });


app.get("/", (req, res) => {
  // res.json({ data: "hello world from socket" });
  res.sendFile(__dirname + "/index.html");
});



// on => Listening, emit => Speaking

io.on("connection", (socket) => {
  // console.log("Connection is ready");
  socket.on("send-message", ({ message, roomId }) => {
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("message-from-server", { message });
  });

  socket.on("typing-started", ({ roomId }) => {
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-started-from-server");
  });

  socket.on("typing-stoped", ({ roomId }) => {
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-stoped-from-server");
  });

  socket.on("join-room", ({ roomId }) => {
    console.log("Joining room");
    socket.join(roomId);
  });

  socket.on("disconnect", (socket) => {
    console.log("User left.");
  });
});


// listen server
const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});