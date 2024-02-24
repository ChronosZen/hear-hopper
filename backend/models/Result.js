import mongoose from 'mongoose';

const hearingSchema = new mongoose.Schema({
  testType: String,
  userID: Number, 
  timestamp: String,
  hearingAbility: String
});

export default mongoose.model('Hearing', hearingSchema);

