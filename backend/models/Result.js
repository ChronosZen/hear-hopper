import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  userID: String,
  kidID: String,
  hearingAbility: String,
  leftEar: [{
    leftFrequency: Number,
    leftDecibel: Number,
    time: {
      type: Date,
      default: Date.now
    }
  }],
  rightEar: [{
    rightFrequency: Number,
    rightDecibel: Number,
    time: {
      type: Date,
      default: Date.now
    }
  }],
  leftEarAvg: Number,
  rightEarAvg: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Result', resultSchema);
