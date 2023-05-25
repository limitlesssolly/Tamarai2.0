import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    id : {
        type: Number,
        required: true,
    },
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
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    color: {
        type: Array,
        required: true,
    },
}, { timestamps: true });

const Products = mongoose.model('ProductsData', productSchema);
export default Products;