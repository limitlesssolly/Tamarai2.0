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
    cart: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    type: { type: String, required: false, },
    password: String,
    confirmPassword: String

}, );

const usi = mongoose.model('User', USchema);
export default usi;