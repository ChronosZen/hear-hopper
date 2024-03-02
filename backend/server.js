import express from "express";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/User.js";
import resultRouter from "./routes/TestResult.js";
// import TestResultsRouter from "./routes/TestResult.js";


const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/users", userRouter);
app.use("/results", resultRouter);
// app.use("/resources", resourcesRouter);
// app.use('/noisecheck', NoiseCheck);
// app.use('/hearingage', HearingAge);

// Root route
app.get("/", (req, res) => {
  res.send("Hello, HearHopper!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
