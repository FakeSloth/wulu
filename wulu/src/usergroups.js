import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true, unique: true },
  group: { type: String, default: '' }
});

export default mongoose.model('usergroup', userSchema);
