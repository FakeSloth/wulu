import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true },
  group: { type: String, default: '' },
  money: { type: Number, default: 0 }
});

export default mongoose.model('user', userSchema);
