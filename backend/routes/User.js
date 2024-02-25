import express from 'express';
import UserController from "../controllers/UserController.js"; 

const router = express.Router();
router.get("/", UserController.get);
router.get('/:id', UserController.getById);
router.post("/", UserController.post);
router.put('/:id', UserController.update); 
// recheck
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);


export default router;