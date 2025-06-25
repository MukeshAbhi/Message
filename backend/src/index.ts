import express from "express";
import dbConnection from "./db";
import cors from "cors";
import 'dotenv/config';
import errorMiddleware from "./middleware/errorMiddleware";
import { router } from "./routes";
import { io, app, server } from "./lib/socket";

const port = process.env.PORT || 3001;

dbConnection();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://messenger.mukeshtech.site/" 
    ],
    credentials: true
}));

// Increase payload limits for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/api/v1",router);

//error middleware
app.use(errorMiddleware);

server.listen(port,() => {
    console.log(`Server running on ${port}` )
});