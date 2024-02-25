import mongoose from 'mongoose';

const soundSchema = new mongoose.Schema({
  id: Number, 
  description: String,
  soundUrl: String 
}, {
  timestamps: true,
});

export default mongoose.model("Sound", soundSchema);
