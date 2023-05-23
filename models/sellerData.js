const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SellerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const seller= mongoose.model("SellerData",SellerSchema);
export default seller;
