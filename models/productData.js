import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
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
    count: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: Array,
        required: true,
    },
    reviews: [{
    name: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "users",
    },
}
    ]},
{ timestamps: true})


const ProductsData = mongoose.model('ProductsData', productSchema);
export default ProductsData;