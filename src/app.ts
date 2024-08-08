import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config'


import indexRouter from './routes/index';
import usersRouter from './routes/users';
import productsRouter from './routes/products';
import mongoose from 'mongoose';
import cors from 'cors'

const db = process.env.DATABASE_URI as string;



main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(db);
}


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter);







export default app;
