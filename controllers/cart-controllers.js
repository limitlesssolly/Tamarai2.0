import Order from '../models/orders.js';
import rege from '../models/tryseller.js';
import ProductsData from '../models/productData.js';

export const getCart = async(req, res) => {
    try {
        const user = await rege.findById(req.user._id).populate('bag.product');
        res.render('cart', { bag: user.bag });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const checkout = async(req, res) => {
    try {
        const user = await rege.findById(req.user._id).populate('bag.product');
        const order = new Order({
            user: req.user._id,
            products: user.bag.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            }))
        });

        await order.save();
        user.bag = [];
        await user.save();

        res.redirect('/orders');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};