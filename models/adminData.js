import mongoose from 'mongoose';

const Admin = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const admin = new mongoose.model("adminData", Admin)
export default admin;