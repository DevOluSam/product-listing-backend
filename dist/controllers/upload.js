"use strict";
// import { Request, Response } from 'express';
// import { v2 as cloudinary } from 'cloudinary';
// cloudinary.config({
//   secure: true
// });
// export const uploadImage = async (imagePath: string) => {
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };
//     try {
//       const result = await cloudinary.uploader.upload(imagePath, options);
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
// };
// export const getAssetInfo = async (publicId: any) => {
//     const options = {
//       colors: true,
//     };
//     try {
//         const result = await cloudinary.api.resource(publicId, options);
//         return result.colors;
//         } catch (error) {
//         console.error(error);
//     }
// };
// export const createImageTag = (publicId: any, ...colors: any) => {
//     // Set the effect color and background color
//     const [effectColor, backgroundColor] = colors;
//     // Create an image tag with transformations applied to the src URL
//     let imageTag = cloudinary.image(publicId, {
//       transformation: [
//         { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//         { radius: 'max' },
//         { effect: 'outline:10', color: effectColor },
//         { background: backgroundColor },
//       ],
//     });
//     return imageTag;
// };
// export const fileUpload = async (req: Request, res: Response) => {
//   try {
//     console.log('uploading file');
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }
//     const filePath = req.file.path;
//     // Upload the image to Cloudinary
//     const publicId = await uploadImage(filePath);
//     // Get the colors in the image
//     const colors = await getAssetInfo(publicId);
//     // Create an image tag, using two of the colors in a transformation
//     const imageTag = createImageTag(publicId, colors[0][0], colors[1][0]);
//     // Send the image tag in the response
//     // console.log(imageTag);
//     res.status(200).send(imageTag);
//   } catch (error: any) {
//     res.status(500).send(`Error processing image: ${error.message}`);
//   }
// }
