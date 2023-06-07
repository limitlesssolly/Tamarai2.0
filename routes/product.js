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
router.get('/:id', async function (req, res, next) {
    const product = await Product.findById(req.params.id);
    res.render('user/productaya', { product });
})


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user');
    res.render('user/productaya', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// router.post('/:id/rate', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     const newReview = {
//       name: req.body.name,
//       rating: req.body.rating,
//       comment: req.body.comment,
//       user: req.user._id,
//     };
//     product.reviews.push(newReview);
//     await product.save();
//     res.redirect(`/products/${req.params.id}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });


export default router;