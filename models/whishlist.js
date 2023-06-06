import mongoose from 'mongoose';

const WishListSchema = new mongoose.Schema({
    Wish : {
        type: String,
        required: true
    }
})

const Wishlist = new mongoose.model('Wishlist', WishListSchema);
export default Wishlist;