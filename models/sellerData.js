import mongoose from "mongoose";
const SellerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true,})

const seller = mongoose.model("Sellers", SellerSchema);
export default seller;