import mongoose from "mongoose";

const UserModel = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
  })
);

export default UserModel;
