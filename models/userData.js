import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    whishlist: {
        type: Array,
    },
}, { timestamps: true });

const Users = mongoose.model('usersData', userSchema);
export default Users;