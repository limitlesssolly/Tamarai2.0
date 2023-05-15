import mongoose, { connection } from 'mongoose';

mongoose.connect("mongodb://localhost:27017/admin")
.then(()=>{
    console.log("connected to the goose")
})
.catch(()=>{
    console.log("ain't no geese here")
})

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

export default connection;