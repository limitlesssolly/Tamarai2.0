import mongoose from 'mongoose';

const Admin = new mongoose.Schema({
    naming:
    {
        type:String,
        required:false,
    },
    username:
    {
        type:String,
        required:true,
    },
    password:
    {
        type:String,
        required:true,
    },
    Utype:
    {
        type:String,
        required:false,
    },
    

}, { timestamps: true })

const admin = new mongoose.model("adminData", Admin)
export default admin;