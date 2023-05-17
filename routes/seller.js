import express from 'express';
import Seller from '../models/sellerData.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('seller-sign-in', { seller: new Seller() });
});

router.post('/', async (req, res) => {
  const seller = new Seller({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const newSeller = await seller.save();
    res.redirect('/seller/dashboard');
  } catch (err) {
    res.render('seller-sign-in', {
      seller: seller,
      errorMessage: 'Error signing up',
    });
  }
});

router.get('/dashboard', (req, res) => {
  res.render('seller-dashboard');
});

export default router;