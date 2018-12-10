const express = require('express');
const http = require('http');
app = express();
server = http.createServer(app);
io = require('socket.io').listen(server);
const port = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    console.log("Chat Application is Live");
});

io.on('connection', (socket)=>{
    console.log("User Connected");
    socket.on('join', (userNickname)=>{
        console.log(userNickname + ": has joined the Chat");
        socket.broadcast.emit('userjoinedthechat', userNickname + ": has joined the Chat");
    });


    socket.on('messagedetection', (senderNickname, messageContent)=>{
        console.log(senderNickname + " : " + messageContent);
        let message = {"message":messageContent, "senderNickname":senderNickname};
        io.emit('message',message);
    });

    socket.on('disconnect',()=>{
        console.log(userNickname + " has left the Chat");
        socket.broadcast.emit("userdisconnect", 'user has left');
    });
});

server.listen(port);
console.log(`APP live on ${port}`);