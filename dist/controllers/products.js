"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.getProductByUserId = exports.deleteProduct = exports.editProduct = exports.createProduct = void 0;
const products_1 = __importDefault(require("../models/products"));
const users_1 = __importDefault(require("../models/users"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, createdBy } = req.body;
    let imageUrl;
    if (req.file) {
        const filePath = req.file.path;
        imageUrl = `/uploads/${req.file.filename}`;
        const result = yield cloudinary_1.v2.uploader.upload(filePath);
        imageUrl = result.secure_url;
        fs_1.default.unlinkSync(filePath);
    }
    const user = yield users_1.default.findById(createdBy);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const newProduct = new products_1.default({
        name,
        description,
        price,
        image: imageUrl,
        createdBy: user._id,
    });
    yield newProduct.save();
    res.status(201).json(newProduct);
});
exports.createProduct = createProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    const updatedProduct = yield products_1.default.findByIdAndUpdate(id, {
        name,
        description,
        price,
        image,
    }, { new: true, runValidators: true });
    if (!updatedProduct) {
        return res.json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
});
exports.editProduct = editProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedProduct = yield products_1.default.findByIdAndDelete(id);
    if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
});
exports.deleteProduct = deleteProduct;
const getProductByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { createdBy } = req.params;
    const products = yield products_1.default.find({ createdBy });
    if (!products) {
        return res
            .status(404)
            .json({ NotFoundError: "No products found for this user" });
    }
    res.status(200).json(products);
});
exports.getProductByUserId = getProductByUserId;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_1.default.find();
    res.json(products);
});
exports.getAllProducts = getAllProducts;
