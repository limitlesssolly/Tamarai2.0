import { Router } from 'express';
import express from "express";
const router = Router();
import {signup,signins, signupValidation} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-sign-in');
});

/* GET /seller/products page. */
router.get('/products', function(req, res, next) {
    res.render('seller-products');
});

/* GET /seller/register page. */
router.get('/seller/register', function(req, res, next) {
    res.render('seller/seller-register');
})
router.get('/seller/info', function(req, res, next) {
    res.render('seller/seller-info');
})
router.get('/seller/products', function(req, res, next) {
    res.render('seller/seller-products');
})

router.post('/', signins);
router.post('/register', signup);

export default router;