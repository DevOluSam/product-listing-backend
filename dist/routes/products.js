"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const router = express_1.default.Router();
/* GET home page. */
// router.get('/products', function(req: Request, res: Response, next: NextFunction) {
//   res.send("GET HOMEPAGE")
// });
router.post('/create', products_1.createProduct);
router.put('/edit/:id', products_1.editProduct);
router.delete('/delete/:id', products_1.deleteProduct);
router.get('/products', products_1.getAllProducts);
router.get('/product/:id', products_1.getProductByUserId);
exports.default = router;
