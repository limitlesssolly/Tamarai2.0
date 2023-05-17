import mongoose, { connection } from 'mongoose';

const Admin = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const data = new mongoose.model("adminData", Admin)

export default data;