import Order from '../models/Order';
import User from '../models/User';
import Product from '../models/Product';

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bag.product');
    res.render('cart', { bag: user.bag });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

export const checkout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bag.product');
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
