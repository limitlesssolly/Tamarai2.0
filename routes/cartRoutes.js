import { Router } from 'express';
import { getCart, checkout } from '../controllers/cartController';

const router = Router();

router.get('/cart', getCart);
router.post('/checkout', checkout);

export default router;