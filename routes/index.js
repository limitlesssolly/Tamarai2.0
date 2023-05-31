import { Router } from 'express';
import express from "express";
const router = Router();

/* GET / page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: "Landing Page"});
});

export default router;