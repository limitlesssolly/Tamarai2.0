import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique  : true
    },

    password: String,
  confirmPassword: String
});

const Useri = mongoose.model('usersData', userSchema);
export default Useri;