import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  id: Number, 
  description: String,
  image: String
}, {
  timestamps: true,
});

export default mongoose.model("Image", imageSchema);
