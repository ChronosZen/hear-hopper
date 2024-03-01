import mongoose from 'mongoose';

const soundSchema = new mongoose.Schema({
  id: String,
  soundUrl: String,
  image: String,
  title: String
}, {
  timestamps: true,
});

export default mongoose.model("Sound", soundSchema);