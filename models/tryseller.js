import mongoose from 'mongoose';

const SellSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
},
  username: {
    type: String,
    required: true,
    unique: true
},
  type: { type: String, required: false, },
  password: String,
  confirmPassword: String,
});

const rege1 = mongoose.model('tries', SellSchema);
export default rege1;