import { Router } from 'express';
import express from "express";
const router = Router();

/* GET / page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: "Landing Page"});
});

/* GET /admin page. */
router.get('/admin', function(req, res, next) {
    res.render('admin/admin-sign-in');
})

/* GET /user page. */
router.get('/user', function(req, res, next) {
    res.render('user/user-sign-in');
})

/* GET /seller page. */
router.get('/seller', function(req, res, next) {
    res.render('seller/seller-sign-in');
})



export default router;