// deployment imports - 1.
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// deployment security packages -5.
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

// express
import express from "express";
import morgan from "morgan";
// package to handle async errors properly
import "express-async-errors";
// creates an express.js app instance
const app = express();

// dotenv
import dotenv from "dotenv";
// loading env variables from .env file into process.env
dotenv.config();

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import auth from "./middleware/auth.js";

const PORT = process.env.PORT || 5001;

// console log requests that are being made
// type of request and route
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// dirname declaration -3.
const __dirname = dirname(fileURLToPath(import.meta.url));
// deployment - where static assets will be located - 2.
app.use(express.static(path.resolve(__dirname, "./client/build")));

// enables express app to parse incom JSON payloads in the req body
app.use(express.json());
// inistialize security packages - 6.
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

// default route
app.get("/api/v1", (req, res) => {
    res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobRouter);

// any get routes go here - 4.
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

/* 
    definining asynchronous function to allow the use
    of the await inside the function to handle async operations
    ex. waiting for Promise from connecting from database
*/
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        // line that starts the express server and listens on specified port
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
