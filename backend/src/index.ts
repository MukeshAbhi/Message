import express from "express";
import dbConnection from "./db";
import cors from "cors";
import 'dotenv/config';
import errorMiddleware from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser"
import { router } from "./routes";

const app = express();

const port = process.env.PORT || 3001;

dbConnection();

app.use(cors());

// Increase payload limits for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/api/v1",router);

//error middleware
app.use(errorMiddleware);

app.listen(port,() => {
    console.log(`Server running on ${port}` )
});