//this file is for server oue website to the server 


const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname + "/public")));

app.get('/',(req,res)=>{
    res.send();
})


//creating socket and listener
const io = require('socket.io')(server);

io.on("connection",(socket)=>{

    socket.on("newuser",(username)=>{
        socket.broadcast.emit("update",username + " Joined The Conversation");
    });

    socket.on("exituser",(username)=>{
        socket.broadcast.emit("update",username + " left The Conversation");
    });

    socket.on("chat",(message)=>{
        socket.broadcast.emit("chat",message);
    });

})

server.listen(3000,()=>{
    console.log("listening on port 3000");
})
