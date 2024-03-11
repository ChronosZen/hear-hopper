import express from "express";
import morgan from "morgan";
import cors from "cors";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

import router from "./router";
import { protect } from "./modules/auth";
import { login, signup } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Entry route for checking live server

app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello HearHopper Client!");
});

// Public routes for user signup and signin

app.post("/signup",body("email").exists().isEmail(),body("password").exists(),handleInputErrors,signup);
app.post("/login",body("email").exists().isEmail(),body("password").exists(),handleInputErrors,login);

// Private routes for authenticated user only

app.use("/api", protect, router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke with our server!");
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find the resource you're looking for!");
});

export default app;
