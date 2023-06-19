import mongoose from 'mongoose';

const Admin = new mongoose.Schema({

    name: { type: String, required: false, },

    username: { type: String, unique: true, required: true, },

    password: { type: String, required: true, },

    type: { type: String, required: false, },


    role: {
        type: String,
        default: 'admin',
        immutable: true
    }
}, { timestamps: true })

const admin = new mongoose.model("adminData", Admin)
export default admin;