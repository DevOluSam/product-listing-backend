import express, { Request, Response, NextFunction } from 'express';
import { createUser, login } from '../controllers/users';
const router = express.Router();


router.post('/signup', createUser)
router.post('/login', login )

export default router;
