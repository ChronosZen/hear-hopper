import express from 'express';
import ResultController from "../controllers/ResultController.js";

const TestResultsRouter = express.Router();

// Get all results
TestResultsRouter.get("/", ResultController.get);

// Get results by user and kid ID
TestResultsRouter.get("/:userID/:kidID", ResultController.getById);

// Create new result for a user or kid
TestResultsRouter.post("/", ResultController.post);

// Update existing result by appending rightEar and leftEar results
TestResultsRouter.put("/:userID/:kidID", ResultController.update);

export default TestResultsRouter;
