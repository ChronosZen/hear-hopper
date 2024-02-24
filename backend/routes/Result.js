import express from 'express';
import ResultsController from "../controllers/ResultsController"; 

const router = express.Router();
router.get("/", ResultsController.get);
router.get('/:id', ResultsController.getById);
router.post("/", ResultsController.post);


export default router;