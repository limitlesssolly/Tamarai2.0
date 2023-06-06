import ProductsData from '../models/productData.js';
import categories from '../models/categories.js';
export const getAllProducts = async(req, res) => {
    try {
        const products = await ProductsData.find();
        res.render('products', { products });
    } catch (err) {
        console.log(err);
    }
};

export const getProductById = async(req, res) => {
    try {
        const product = await ProductsData.findById(req.params.id);
        res.render('product-details', { product });
    } catch (err) {
        console.log(err);
    }
};
export const getHomepage = async(req, res) => {
    try {
        const cats = await categories.find();
        const productData = await ProductsData.find();
        console.log('productData:', productData);
        res.render('user/user-homepage', {productData}, {cats});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};
export const getProducts = async(req, res) => {
    try {
        const productData = await ProductsData.find();
        console.log('productData:', productData);
        res.render('admin/admin-sellings', { productData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

export const getShoppingBag = async(req, res) => {
    try {
        const productData = await ProductsData.find();
        console.log('productData:', productData);
        res.render('user/user-shoppingbag', { productData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}
export const getAllReviews = async (req, res) => {
    try {
      const product = await ProductsData.findById(req.params.id);
      const reviews = product.reviews.find({});
      return res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };