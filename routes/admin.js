import { Router } from 'express';
const router = Router();
const admin = require("../models/admin-data");

router.get('/', function (req, res, next){
    res.render('./Admin/admin-sign-in');
})

router.get('/dashboard', function (req, res, next){
    res.render('./Admin/admin-dashboard');
})

router.post('/', function (req, res, next){
    res.send('new adminin');
})

export default router;