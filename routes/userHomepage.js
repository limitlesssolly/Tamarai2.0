import express from 'express';
const router = express.Router();
import categories from '../models/categories.js';
import Wishlist from '../models/whishlist.js'
import products from '../models/productData.js'
import regi from "../models/userRegister.js";
import { getHomepage, getShoppingBag } from '../controllers/products-controllers.js';

router.get('/', async function(req, res, next) {
    try {
        const cats = await categories.find();
        const productData = await products.find();
        res.render('user/user-homepage', { productData, cats });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.get('/checkout', function(req, res, next) {
    res.render('user/user-checkout');
});

router.post('/checkout', async(req, res) => {
    try {
        // Extract order information from the request body
        const { name, email, address } = req.body;

        // Create a new order document in the database
        const order = new Order({
            buyerName: name,
            buyerEmail: email,
            shippingAddress: address,
            // Add other relevant fields for the order
        });

        // Save the order in the database
        await order.save();

        // Retrieve the order ID
        const orderId = order._id;

        // Perform additional actions like sending confirmation emails, calculating total price, etc.
        // ...

        res.redirect(`/order/${orderId}`); // Redirect to the order details page
    } catch (error) {
        // Handle any errors that occur during the order placement
        res.status(500).send('Error placing the order.');
    }
});

// Route to view order details
router.get('/order/:id', async(req, res) => {
    try {
        // Retrieve the order from the database using the provided ID
        const order = await Order.findById(req.params.id);

        // Render the order details page with the retrieved order
        res.render('order-details', { order });
    } catch (error) {
        // Handle any errors that occur while retrieving the order
        res.status(500).send('Error retrieving order details.');
    }
});

router.get('/bag', function(req, res, next) {
    const Prod = products.find({}).then((users) => {
        console.log(Prod);
        res.render('user/user-shoppingbag', { Prod });
    }).catch((err) => {
        next(err);
    });
});

router.get('/bag/checkout', function(req, res, next) {
    res.render('user/user-shoppingbag');
});

router.get('/profile', function(req, res, next) {
    res.render('user/user-profile');
});

router.get('/add-to-wishlist/:id', async function(req, res, next) {
        const product = await products.findById(req.params.id);
        console.log(product);
        const wishat = new Wishlist({
            name: product.name,
            brand: product.brand,
            seller: product.seller,
            price: product.price,
            image: product.image,
            count: product.count,
            description: product.description,
            category: product.categories,
            color: product.color,
        });
        await wishat.save();
        console.log('et7at');
        res.redirect('/user/homepage');
    }

);

router.get('/whishlist', async function(req, res, next) {
    const wished = await Wishlist.find();
    console.log(wished);
    res.render('user/user-whishlist', { wished });

})

// Add this debug statement
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Kol haga hatb2a kwisa inshallah');
});

router.get('/profile', async(req, res) => {
    const regs = await regi.find();
    res.render('user/user-profile', { regs });
});

/* GET /user/homepage/profile page. */
router.get('/profile/:id', async(req, res) => {
    const regs = await regi.findById(req.session.Id);
    res.render('user/user-profile', { regs });
});

router.post('/profile/:id', async(req, res) => {
    const regs = await regi.findById(req.params.id);
    regs.username = req.body.username;
    regs.email = req.body.email;
    // regs.password = req.body.password;
    await regs.save();

    // Retrieve the updated seller data from the database
    const updateduser = await regi.findById(req.params.id);

    // Render the "profile" view with the updated seller data
    res.render('user/user-profile', { regs: updateduser });
});

export default router;