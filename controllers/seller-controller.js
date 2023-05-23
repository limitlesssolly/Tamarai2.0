
//function to handle seller authentication:
const seller = require('../models/sellerData');

exports.getSignIn = (req, res) => {
  res.render('seller-sign-in');
};

exports.postSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await seller.findOne({ email });

    if (!seller) {
      return res.status(400).json({ message: 'Seller not found' });
    }

    if (seller.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};