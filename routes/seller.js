import { Router } from 'express';
const router = Router();
// import seller from '../models/sellerRegister.js';
import {signup,signins} from "../controllers/seller-controller.js";

/* GET /seller page. */
router.get('/', function(req, res, next) {
    res.render('seller/seller-sign-in');
});

/* GET /seller/register page. */
router.get('/register', function(req, res, next) {
    res.render('seller/seller-register');
})

// router.get('/profile/:id', async (req, res) => {
//     console.log('bydkhol hna');
//     try {
//       const sellers = await seller.findById(req.params.id);
//       if (!sellers)return res.status(404).render('error.ejs', { message: "Seller not found" });
//       else return res.render('seller/seller-profile', {seller});
//     } catch (err) {
//       console.log(err);
//       return res.status(500).render('error.ejs');
//     }
//   });

router.post('/', signins);

router.post('/register', signup);

export default router;