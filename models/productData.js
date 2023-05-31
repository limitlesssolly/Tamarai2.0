import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: false,
    },
    seller: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: Array,
        required: false,
    },
}, { timestamps: true });

const Products = mongoose.model('ProductsData', productSchema);
export default Products;