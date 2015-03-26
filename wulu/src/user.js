import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true },
  group: String
});

export default mongoose.model('user', userSchema);
