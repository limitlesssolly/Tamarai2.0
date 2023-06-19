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
    confirmPassword: String,
    role: {
        type: String,
        default: 'seller',
        immutable: true
    }
});

const rege = mongoose.model('Seller', SSchema);
export default rege;