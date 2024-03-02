import express from 'express';
import UserController from "../controllers/UserController.js"; 

const router = express.Router();
router.get("/", UserController.get);
router.get('/:id', UserController.getById);
router.post("/", UserController.post);
router.put('/:id', UserController.update); 
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

router.post("/updateKidInfo/:id", UserController.updateKidInfo);
router.post("/updateKidImage/:id", UserController.updateKidImage);
router.post("/updateKidInfoName/:id", UserController.updateKidInfoName);






export default router;