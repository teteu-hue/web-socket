const express = require("express");
const http = require("http");
const { Server } = require ("socket.io"); //instalção web socket

const app = express 
const server = http.createServer(app)//passando aplicação
const io = new Server(server);// io = imput - output

io.on("connection", (socket) =>{ 
    console.log("Um cliente se conectou"); 

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`Cliente entrou no canal: ${room}`);
    });

    // Cria um evento send_message.
    socket.on('send_message', ({room, message}) => {
        // emite a mensagem para o evento 'receive_message'
        io.to(room).emit('receive_message', message);
    });

    // Cria um evento de disconnect
    socket.on("disconnect", () =>{
        console.log("Um cliente se desconectou");
    });
});

server.listen(8080, () => {
    console.log("Servidor rodando na porta 8080")
})