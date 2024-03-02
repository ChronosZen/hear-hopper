import express from 'express';
import ResultsController from "../controllers/ResultController.js";

const TestResultsRouter = express.Router();

TestResultsRouter.get("/", ResultsController.get);

export default TestResultsRouter;
