import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

import path from "path";
// import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncaught expection");
    process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "backend/config/config.env" });
}

// Connecting to database
connectDatabase();

app.use(
    express.json({
        limit: "10mb",
        verify: (req, res, buf) => {
            req.rawBody = buf.toString();
        },
    })
);
app.use(cookieParser());

// Import all routes
import studentRoutes from "./routes/students.js";
import teacherRoutes from "./routes/teachers.js";
import courseRoutes from "./routes/course.js";
import gradeRoutes from "./routes/grade.js";
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";

import { fileURLToPath } from "url";

app.use("/api/v1", authRoutes);
app.use("/api/v1", studentRoutes);
app.use("/api/v1", teacherRoutes);
app.use('/api/v1', courseRoutes);
app.use('/api/v1', gradeRoutes);
app.use('/api/v1', quizRoutes);


if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    });
}

// Using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});
