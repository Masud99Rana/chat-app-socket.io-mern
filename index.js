const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const PORT = 4000;

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
  socket.on("send-message", (data) => {
    console.log(data);
    socket.broadcast.emit("message-from-server", data);
  });
  socket.on("disconnect", (socket) => {
    console.log("User left.");
  });
});



httpServer.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});