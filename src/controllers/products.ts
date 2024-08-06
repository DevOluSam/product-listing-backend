import { Request, Response } from "express";
import Product from "../models/products";
import User from "../models/users";

export const createProduct = async (req: Request, res: Response) => {
    console.log("creating product...");
    
    const { name, description, price, userId } = req.body;
    console.log({ name, description, price, userId });
    
  
      const user = await User.findById(userId);
      if (!user) {
        return res.json({ error: 'User not found' });
      }
  
      const newProduct = new Product({
        name,
        description,
        price,
        userId: user._id
      });
  
      await newProduct.save();
      res.json(newProduct);
  };


export const editProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price,
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedProduct) {
        return res.json({ error: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
  };


  export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
  
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
  };


  export const getProductByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
  
      const products = await Product.find({ user: userId });
      if (!products) {
        return res.status(404).json({ error: 'No products found for this user' });
      }
      res.status(200).json(products);
  };

  export const getAllProducts = async (req: Request, res: Response) => {
      const products = await Product.find();
      res.json(products);
  };
