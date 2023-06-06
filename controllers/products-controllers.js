import ProductsData from '../models/productData.js';

export const getAllProducts = async(req, res) => {
    try {
        const products = await ProductsData.find();
        res.render('products', { products }, { user: (req.session.user === undefined ? "" : req.session.user) });
    } catch (err) {
        console.log(err);
    }
};

export const getProductById = async(req, res) => {
    try {
        const product = await ProductsData.findById(req.params.id);
        res.render('product-details', { product }, { user: (req.session.user === undefined ? "" : req.session.user) });
    } catch (err) {
        console.log(err);
    }
};
export const getHomepage = async(req, res) => {
    try {
        const productData = await ProductsData.find();
        console.log('productData:', productData);
        res.render('user/user-homepage', { productData }, { user: (req.session.user === undefined ? "" : req.session.user) });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};
export const getProducts = async(req, res) => {
    try {
        const productData = await ProductsData.find();
        console.log('productData:', productData);
        res.render('admin/admin-sellings', { productData }, { user: (req.session.user === undefined ? "" : req.session.user) });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

export const getShoppingBag = async(req, res) => {
    try {
        const productData = await ProductsData.find();
        console.log('productData:', productData);
        res.render('user/user-shoppingbag', { productData }, { user: (req.session.user === undefined ? "" : req.session.user) });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}