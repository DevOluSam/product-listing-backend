import express, { Request, Response, NextFunction } from 'express';
import { createProduct, editProduct, deleteProduct, getProductByUserId, getAllProducts } from '../controllers/products';
const router = express.Router();

/* GET home page. */
// router.get('/products', function(req: Request, res: Response, next: NextFunction) {
//   res.send("GET HOMEPAGE")
// });

router.post('/create', createProduct )
router.put('/edit/:id', editProduct )
router.delete('/delete/:id', deleteProduct )
router.get('/products', getAllProducts)
router.get('/product/:id', getProductByUserId)

export default router;
