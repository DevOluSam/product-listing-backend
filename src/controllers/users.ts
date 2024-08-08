import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import User from "../models/users";
import jwt from 'jsonwebtoken'

const secret: any = process.env.SECRET

export const createUser = async (req: Request, res: Response) => {

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.json({ ExistingUserError: 'Email already exists. Try again' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    
    await newUser.save();
    res.json({ SuccessMessage: 'User registered successfully' });
  } 


export const login = async (req: Request, res: Response) => {

    const user: any = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.json({ NotFoundError: 'Account does not exist' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.json({ IncorrectPassword: 'Incorrect Password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, userId: user._id }, secret);
    res.json({ token,  createdBy: user._id });
  }