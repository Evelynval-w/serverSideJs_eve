import express from "express";
import cors from "cors";

// TODO 1: Import connectToMongoDB from ./config/db.js
// TODO 2: Import studentRouter from ./routes/studentsRoute.js

import { connectToMongoDB } from "./config/db.js";
import studentRouter from "./routes/studentsRoute.js";
import userRouter from "./routes/userRoute.js";
import mentorCircleRouter from "./routes/mentorCircleRoute.js";

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();

// TODO 3: Call connectToMongoDB() here to establish the DB connection

// Middleware — already set up for you
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'))

// TODO 4: Mount studentRouter at "/api/students"
// Hint: app.use("/api/students", studentRouter)

app.use("/api/students", studentRouter)
app.use("/api/auth", userRouter);
app.use("/api/mentor-circles", mentorCircleRouter);

app.get("/", (req, res) => {
  res.send("Server is running ...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
