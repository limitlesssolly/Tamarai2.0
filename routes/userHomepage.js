import express from 'express';
const router = express.Router();
import categories from '../models/categories.js';
import Wishlist from '../models/whishlist.js'
import Bag from '../models/shopping-bag.js'
import products from '../models/productData.js'
import regi from "../models/userRegister.js";
import { getHomepage, getShoppingBag } from '../controllers/products-controllers.js';
import { userInfo } from 'os';
import { getCart, checkout, remove } from "../controllers/cart-controllers.js";

router.get('/', async function(req, res, next) {
    try {
        const cats = await categories.find();
        const regs = await regi.findById(req.session.Id);
        const uses = regs.username;
        const wished = await Wishlist.find({ wisher: uses });
        const productData = await products.find();
        res.render('User/user-homepage', { productData, cats, wished });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.get('/bag/checkout', function(req, res, next) {
    res.render('User/user-checkout');
});

router.post('/bag/checkout', async(req, res) => {
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
router.delete('/User/homepage/bag/remove/:id', remove);

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

router.get('/bag', async function(req, res, next) {
    try {
        const bag = await Bag.find();
        console.log(bag);
        res.render('User/user-shoppingbag', { bag });
    } catch (error) {}
});

//i guess i should add the product to the bag here
router.get('/add/:id', async function(req, res, next) {
    console.log('hi');
    const product = await products.findById(req.params.id);
    console.log(product);
    const bagat = new Bag({
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
    await bagat.save();
    console.log('et7at');
    res.redirect('/User/homepage');
});
router.post('/bag/checkout', checkout);

router.get('/bag/checkout', function(req, res, next) {
    res.render('User/user-checkout');
});

router.get('/profile', function(req, res, next) {
    res.render('User/user-profile');
});

router.get('/add-to-wishlist/:id', async function(req, res, next) {
        const product = await products.findById(req.params.id);
        const regs = await regi.findById(req.session.Id);
        const uses = regs.username;
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
            wisher: uses,
        });
        await wishat.save();
        console.log('et7at');
        res.redirect('/User/homepage');
    }

);

router.get('/delete-from-wishlist/:id', async function(req, res, next) {
        const id = req.params.id;
        const wish = await Wishlist.findByIdAndDelete(id);
        console.log(`Wish ${wish.name} has been deleted..`);
        const regs = await regi.findById(req.session.Id);
        const uses = regs.username;
        const wished = await Wishlist.find({ wisher: uses });
        console.log(wished);
        res.render('User/user-whishlist', { wished });
    }

);

// Get /user/homepage/chat 
router.get('/chat', async function(req, res, next) {
    res.render('chat');
})

router.get('/whishlist', async function(req, res, next) {
    const regs = await regi.findById(req.session.Id);
    const uses = regs.username;
    const wished = await Wishlist.find({ wisher: uses });
    console.log(wished);
    res.render('User/user-whishlist', { wished });
});

// Add this debug statement
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Kol haga hatb2a kwisa inshallah');
});

router.get('/profile', async(req, res) => {
    const regs = await regi.find();
    res.render('User/user-profile', { regs });
});

/* GET /user/homepage/profile page. */
router.get('/profile/:id', async(req, res) => {
    const regs = await regi.findById(req.session.Id);
    res.render('User/user-profile', { regs });
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
    res.render('User/user-profile', { regs: updateduser });
});


export default router;