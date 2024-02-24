import express from 'express';
import ResultsController from "../controllers/ResultController.js";

const resultsRouter = express.Router();

resultsRouter.get("/", ResultsController.get);
resultsRouter.post("/", ResultsController.post);

export default resultsRouter;
