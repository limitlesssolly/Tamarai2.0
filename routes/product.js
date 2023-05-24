import { Router } from 'express';
const router = Router();

// Get products page
router.get('/', function (req, res, next){
    // res.render('user/product');
    res.send("hello");
})