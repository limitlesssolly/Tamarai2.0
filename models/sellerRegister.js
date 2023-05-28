const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  confirmPassword: String
});

const rege = mongoose.model('SellerData', sellerSchema);
export default rege;