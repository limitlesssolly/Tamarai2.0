import { Router } from 'express';
import express from "express";
const router = Router();
import { signups, signins, signupValidation } from "../controllers/user-controllers.js";

/* GET /user page. */
router.get('/', function(req, res, next) {
    res.render('user/user-sign-in');
});

// User homepage
router.get('/home', function(req, res, next) {
    res.render('user/user-homepage');
})

/* GET /user/register page. */
router.get('/register', function(req, res, next) {
    res.render('user/user-register');
});

/* GET /user/homepage page. */
router.get('/homepage', function(req, res, next) {
    res.render('user/user-homepage');
})

/* GET /user/checkout page. */
router.get('/homepage/checkout', function(req, res, next) {
    res.render('user/user-checkout');
})


router.post('/', signins);

export default router;