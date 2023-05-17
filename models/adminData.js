import mongoose, { connection } from 'mongoose';

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const collection = new mongoose.model("adminCollection", adminSchema)

export default collection;