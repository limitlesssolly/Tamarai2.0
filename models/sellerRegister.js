import mongoose from 'mongoose';

const SSchema = new mongoose.Schema({
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
  password: String,
  confirmPassword: String
});

const rege = mongoose.model('Seller', SSchema);
export default rege;