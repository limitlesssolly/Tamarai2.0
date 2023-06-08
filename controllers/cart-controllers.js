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

        // Update the cart based on the submitted form data
        Object.entries(req.body).forEach(([productId, quantity]) => {
            const itemIndex = user.bag.findIndex(item => item.product._id.toString() === productId);
            if (itemIndex !== -1) {
                user.bag[itemIndex].quantity = parseInt(quantity);
            }
        });

        await user.save();

        // ... rest of the checkout function ...
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
export const remove = async(req, res) => {
    try {
        const user = await rege.findById(req.user._id);
        user.bag = user.bag.filter(item => item.product.toString() !== req.params.id);
        await user.save();
        res.status(200).send('Item removed from the cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};