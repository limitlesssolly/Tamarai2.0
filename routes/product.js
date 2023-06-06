import { Router } from 'express';
import express from "express";
import Product from "../models/productData.js";
import Categories from '../models/categories.js';
const router = Router();

// Get all products /product/
router.get('/', async (req, res, next) => {
    const Products = await Product.find();
    res.render('user/products', { Products });
});

// Get single product /product/:id
router.get("/:id", (req, res, next) => {
    // res.send(`Single product test message ${req.params.id}`);
    var query = { "_id": req.params.id };
    Products.find(query)
    .then(result => {
        res.render('productaya', { prod: result[0] })
    })
    .catch(err => {
      console.log(err);
    });
});

// router.get('/products', async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) - 1||0;
//         const limit = parseInt(req.query.limit) || 5;
//         const search = req.query.search||"";
//         let sort = req.query.sort|| "rating";
//         let cat = req.query.cat||"All";
//         const catOptions = await Categories.find();
//         cat ==="All"?  (cat = [...catOptions]):(cat = req.query.cat.split(","));
//         req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
//         let sortBy = {};
//         if (sort[1]) {
//             sortBy[sort[0]] = sort[1];
//         }
//         else {
//             sortBy[sort[0]] = "asc";
//         }

//         const products = await Product.find({ name: { $regex: search, $options: "i" } })
//             .where("cat")
//             .in({...cat})
//             .sort(sortBy)
//             .skip(page*limit)
//             .limit(limit);

//         const total = await Product.countDocuments({
//             cat: { $in: [...cat]},
//             name: { $regex: search, $options: "i" },
//         });

//         const response = {
//             error: false,
//             total: total,
//             page: page + 1,
//             limit: limit,
//             cat: catOptions,
//             products: products,
//         }

//         res.status(200).json(response);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ error: true, message: "Internal Server Error" });
//     }
// });

// Get a single product by its ID


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