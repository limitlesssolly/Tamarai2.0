import { Router } from 'express';
import Product from "../models/productData.js";
const router = Router();

// Get all products 
router.get('/', (req, res, next) => {
    res.send("All products");
    //res.render('user/product');
    //Retrieve products data from MongoDB
    const products = Product.find({}).then((products) => {
        res.json(products);
    }).catch((err) => {
        next(err);
    });
});

// Get a single product by its ID
router.get("/:id", (req, res, next) => {
    res.send(`Single product test message ${req.params.id}`);
});

/* GET /seller/product page. */
// router.get('/', function (req, res, next){
//     res.render('seller/seller-product');
// })

export default router;