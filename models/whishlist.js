import mongoose from 'mongoose';

const WishListSchema = new mongoose.Schema ( {
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
        required: false,
    },
    count: {
        type: Number,
        required:true,
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
    }
},


{ timestamps: true});
const Wishlist = new mongoose.model('Wishlist', WishListSchema);
export default Wishlist;