import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "https://messenger.mukeshtech.site/"
        ],
        credentials: true
    },
});

// used to store online users
const userSocketMap: { [userId: string]: string } = {}; // {userId: socketId}

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    const userId = socket.handshake.query.userId;
    if (typeof userId === "string") {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} mapped to socket ${socket.id}`);
    }

    socket.on("disconnect", (reason) => {
        console.log("User disconnected: ", socket.id, "Reason:", reason);

        // Remove user from the socket map when they disconnect
        if (typeof userId === "string") {
            delete userSocketMap[userId];
            console.log(`User ${userId} removed from socket map`);
        }
    });
})

export { io, app, server}