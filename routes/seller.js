import { Router } from 'express';
import express from "express";
const router = Router();
import seller from '../models/sellerRegister.js';
import {signup,signins, signupValidation} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-sign-in');
});

/* GET /seller/products page. */
router.get('/products', function(req, res, next) {
    res.render('seller/seller-products');
});

/* GET /seller/register page. */
router.get('/register', function(req, res, next) {
    res.render('seller/seller-register');
})

/* GET /seller/info page. */
router.get('/info', function(req, res, next) {
    res.render('seller/seller-info');
})

/* GET /seller/products page. */
router.get('/products', function(req, res, next) {
    res.render('seller/seller-products');
})

// router.get('/profile', function(req, res, next) {
//     res.render('seller/seller-profile');
// })
// router.get('/seller/profile/:id', async (req, res) => {
//     try {
//       const seller = await seller.findById(req.params.id);
//       if (!seller) {
//         return res.status(404).render('error.ejs', { message: "Seller not found" });
//       }
//       return res.render('seller-profile', { seller });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).render('error.ejs');
//     }
//   });

router.get('/profile/:id', async (req, res) => {
    console.log('bydkhol hna');
    try {
      const sellers = await seller.findById(req.params.id);
      if (!sellers)return res.status(404).render('error.ejs', { message: "Seller not found" });
      else return res.render('seller/seller-profile', {seller});
    } catch (err) {
      console.log(err);
      return res.status(500).render('error.ejs');
    }
  });

router.post('/', signins);

router.post('/register', signup);

export default router;