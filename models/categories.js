import mongoose from 'mongoose';

const cats = new mongoose.Schema({

    name: { type: String, required: true, },

}, { timestamps: true })

const categories = new mongoose.model("categories", cats)
export default categories;