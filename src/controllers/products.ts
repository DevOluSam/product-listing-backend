import { Request, Response } from "express";
import Product from "../models/products";
import User from "../models/users";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, createdBy } = req.body;

  let imageUrl;
  if (req.file) {
    const filePath = req.file.path;
    imageUrl = `/uploads/${req.file.filename}`;

    const result = await cloudinary.uploader.upload(filePath);
    imageUrl = result.secure_url;

    fs.unlinkSync(filePath);
  }
  const user = await User.findById(createdBy);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const newProduct = new Product({
    name,
    description,
    price,
    image: imageUrl,
    createdBy: user._id,
  });

  await newProduct.save();
  res.status(201).json(newProduct);
};

export const editProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      image,
    },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return res.json({ error: "Product not found" });
  }

  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ message: "Product deleted successfully" });
};

export const getProductByUserId = async (req: Request, res: Response) => {
  const { createdBy } = req.params;

  const products = await Product.find({ createdBy });

  if (!products) {
    return res
      .status(404)
      .json({ NotFoundError: "No products found for this user" });
  }
  res.status(200).json(products);
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};
