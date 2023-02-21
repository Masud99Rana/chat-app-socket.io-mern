const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const PORT = 4000;

// create server through http
const httpServer = http.createServer(app);

// create socket server based on httpServer
const io = new Server(httpServer);

// socket Middlewares 
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
  res.sendFile(__dirname + "/client/index.html");
});



// io.on(eventName, cbfn); // on => listening

// on => Listening, emit => Speaking
io.on("connection", (socket) => {
  console.log("Connection is ready", socket.id);

  socket.on("disconnect", () =>{
    console.log("Disconnected!", socket.id);
  });

  socket.on('clientEvent', (payload) => {
    console.log("Msg->", payload);

    // =>  Speak to only socket (only sender)
    // socket.emit('serverEvent', payload); 
    
    // => Speak to all except sender
    socket.broadcast.emit('serverEvent', payload); 
    
    // => Speak to all
    // io.emit('serverEvent', payload); 
  });

  // Room Example
  socket.on("groupNameEvent", (arg) => {
    // save room info permanently in db
    let roomName = arg;
    
    // Join the Room
    socket.join(roomName);
    // => to all
    // io.to(roomName).emit("OkRoomServerEvent", `Welcome to Room(${arg}). ${socket.id} joined`);

    // => to all except sender 
    socket.to(roomName).emit("OkRoomServerEvent", `Welcome to Room(${arg}). ${socket.id} joined`);

  });

});


httpServer.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});