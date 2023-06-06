import mongoose from 'mongoose';

const WishListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: false,
    },
    seller: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    count: {
        type: Number,
        required:false,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    color: {
        type: Array,
        required: false,
    },
}) 

const Wishlist = new mongoose.model('Wishlist', WishListSchema);
export default Wishlist;