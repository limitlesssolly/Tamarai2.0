const express = require('express');
const router = express.Router();
const productscontroller = require('../controllers/products-controller');
router.get('/', productscontroller.getAllProducts);
router.get('/:id', productscontroller.getAllProductsByCode);
module.exports = router;