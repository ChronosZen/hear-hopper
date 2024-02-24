import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  testType: String,
  userID: Number, 
  timestamp: String,
  hearingAbility: String
});

export default mongoose.model('Result', resultSchema);