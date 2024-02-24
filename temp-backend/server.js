import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcrypt";
import connectMongoDB from "./app/utils/connectMongoDB.js";
import cors from "cors";
import UserModel from "./app/models/User.js";

const app = express();
app.use(express.json());
app.use(cors());
connectMongoDB(process.env.MONGODB_URI);

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, password: hashedPassword };
    UserModel.create(user).then(() => {
      res.status(201).send();
    });
  } catch (error) {
    res.status(501).send();
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(async (user) => {
      if (user === undefined) {
        return res.status(400).send("Cannot find user");
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const userWithoutPassword = {
          // id: user.id,
          // firstName: user.firstName,
          // lastName: user.lastName,
          email: user.email,
        };
        res.status(200).json(userWithoutPassword);
        console.log("Success");
      } else {
        res.status(404).json({ message: "Not Found", statusCode: 404 });
        console.log("Not success");
      }
    })
    .catch((error) => res.status(500).json(`Error found: ${error}`));
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
