import express from 'express';
import { editProduct, deleteProduct, getProductByUserId, getAllProducts } from '../controllers/products';
const router = express.Router();

router.put('/edit/:id', editProduct )
router.delete('/delete/:id', deleteProduct )
router.get('/', getAllProducts)
router.get('/:createdBy', getProductByUserId)

export default router;
