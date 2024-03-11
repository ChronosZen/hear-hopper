import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";
import { connectDB } from "./db";

connectDB(process.env.MONGODB_URI);

app.listen(process.env.PORT, () => {
  console.log(
    `starting server on http://localhost:${process.env.PORT}`
  );
});
