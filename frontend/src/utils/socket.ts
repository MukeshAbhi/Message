
import { io, Socket } from "socket.io-client";
import type { User } from "../types";

const BASE_URL = "http://localhost:8081";

let socket: Socket | null = null;

export const getSocket = () => {
    if(socket === null)return;
    return socket;
}

export const isSocketConnected = () => {
    return socket && socket.connected;
}

export const connectSocket = (user:User) => {
    if(!user || !user._id) return;

    // If socket already exists and is connected, don't create a new one
    if(socket && socket.connected) {
        console.log("Socket already connected:", socket.id);
        return;
    }

    // Disconnect existing socket if it exists but is not connected
    if(socket) {
        socket.disconnect();
        socket = null;
    }

    socket = io(BASE_URL, {
        query: {
            userId: user._id
        },
        autoConnect: true
    });

    socket.on("connect", () => {
        console.log("Socket connected successfully:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
    });
}

export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect();
        socket = null;
    }
}