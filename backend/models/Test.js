import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  correctAnswer: String,
  options: [String],
  question: String,
  quizID: Number
}, {
  timestamps: true,
});

export default mongoose.model("Test", testSchema);
