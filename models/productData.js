import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    id : {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Products = mongoose.model('Products', productSchema);
module.exports = Products;