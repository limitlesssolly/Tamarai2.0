import { Router } from 'express';
import express from "express";
import Product from "../models/productData.js";
const router = Router();

// Get all products 
router.get('/', (req, res, next) => {
    // res.send("All products");
    //res.render('user/products', { products: products});
    //Retrieve products data from MongoDB
    const products = Product.find({}).then((products) => {
         res.json(products);
        //res.render('user/try', { products: products });
        // res.render('user/products', { products: products });
    }).catch((err) => {
        next(err);
    });
});

// Get a single product by its ID
router.get("/:id", (req, res, next) => {
    res.send(`Single product test message ${req.params.id}`);
});

//Create a product: /products
// router.post("/", (req, res, next) => {
//     res.json({message: `Product Created ${req.body.name}`});
// });

//Update a product: /products/:id
// router.patch("/:id", (req, res, next) => {
//     res.json({message: `Product Updated id= ${req.params.id} new value = ${req.body.name}`});
// });

//Delete a product: /products/:id
// router.delete("/:id", (req, res, next) => {
//     res.json({message: `Product Deleted id= ${req.params.id}`});
// });

export default router;