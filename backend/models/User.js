import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    id: Number,
    userName: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    age: Number,
    kidInfo: {
      kidID: Number,
    },
    hearingIssue: String,
    hearingTestResult: String
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("User", userSchema);


