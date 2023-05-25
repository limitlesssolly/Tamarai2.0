import { Router } from 'express';
const router = Router();
// MONGODB
const MongoClient = require('mongodb').MongoClient;
// Initialize MongoDB Client
const client = new MongoClient(process.env.ATLAS_URI, { useUnifiedTopology: true });
//


// Get products page
router.get('/', (req, res) => {
    // res.send("hello");   // الوحيدة اللي شغاله
    // res.render('user/product');
    // Retrieve products data from MongoDB
    Db.collection('products').find().toArray((err, products) => {
        if (err) throw err;
        // send product data to EJS template
        res.render('products', { products });
    });
});

export default router;