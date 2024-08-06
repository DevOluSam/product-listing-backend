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
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter);

// (async () => {

//     // Set the image to upload
//     const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

//     // Upload the image
//     const publicId = await uploadImage(imagePath);

//     // Get the colors in the image
//     const colors = await getAssetInfo(publicId);

//     // Create an image tag, using two of the colors in a transformation
//     const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

//     // Log the image tag to the console
//     console.log(imageTag);

// })();





export default app;
