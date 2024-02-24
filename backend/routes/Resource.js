import express from 'express';
import ImagesController from "../controllers/ImageController.js";
import SoundController from "../controllers/SoundController.js";

const resourceRouter = express.Router();

resourceRouter.get("/image", ImagesController.get);
resourceRouter.get("/sound", SoundController.get);

export default resourceRouter;
