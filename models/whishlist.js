const mongoose = require("mongoose")
const WishListSchema = new mongoose.Schema({
    Wish : {
        type: String,
        required: true
    }
})

const Wishlist = new mongoose.model('Wishlist', WishListSchema);
module.exports = Wishlist