import express from 'express';
import ResultsController from "../controllers/ResultController.js";

const TestResultsRouter = express.Router();

TestResultsRouter.get("/", ResultsController.get);
TestResultsRouter.get("/", ResultsController.getById);
TestResultsRouter.post("/", ResultsController.post);

export default TestResultsRouter;
