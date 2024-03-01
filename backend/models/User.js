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
      birthYear: Number,
      gender: String,
      image: String,
      childName: String,
      hearingAid: {
        left: String,
        right: String,
      }
    },
    hearingIssue: String,
    hearingTestResult: String
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("User", userSchema);


