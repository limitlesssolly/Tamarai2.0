const product = require('../models/productData');
const getAllProducts = (req, res) => {
    product.find()
        .then((result) => {
            console.log(result);
            res.render('products', { products: result });
        })
        .catch((err) => {
            console.log(err);
        })
};
const getAllProductsByID = (req, res) => {
    product.find({ _id: req.params._id })
        .then((result) => {
            console.log(result);
            res.render('products', { products: result });
        })
        .catch((err) => {
            console.log(err);
        })
};