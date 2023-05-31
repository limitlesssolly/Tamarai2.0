import mongoose from 'mongoose';

const USchema = new mongoose.Schema({
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

const usi = mongoose.model('User', USchema);
export default usi;