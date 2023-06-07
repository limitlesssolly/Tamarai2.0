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

export default router;