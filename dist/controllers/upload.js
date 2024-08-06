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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = exports.createImageTag = exports.getAssetInfo = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    secure: true
});
const uploadImage = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        const result = yield cloudinary_1.v2.uploader.upload(imagePath, options);
        console.log(result);
        return result.public_id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.uploadImage = uploadImage;
const getAssetInfo = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        colors: true,
    };
    try {
        const result = yield cloudinary_1.v2.api.resource(publicId, options);
        console.log(result);
        return result.colors;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAssetInfo = getAssetInfo;
const createImageTag = (publicId, ...colors) => {
    // Set the effect color and background color
    const [effectColor, backgroundColor] = colors;
    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary_1.v2.image(publicId, {
        transformation: [
            { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
            { radius: 'max' },
            { effect: 'outline:10', color: effectColor },
            { background: backgroundColor },
        ],
    });
    return imageTag;
};
exports.createImageTag = createImageTag;
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        const filePath = req.file.path;
        // Upload the image to Cloudinary
        const publicId = yield (0, exports.uploadImage)(filePath);
        // Get the colors in the image
        const colors = yield (0, exports.getAssetInfo)(publicId);
        // Create an image tag, using two of the colors in a transformation
        const imageTag = (0, exports.createImageTag)(publicId, colors[0][0], colors[1][0]);
        // Send the image tag in the response
        console.log(imageTag);
        res.status(200).send(imageTag);
    }
    catch (error) {
        res.status(500).send(`Error processing image: ${error.message}`);
    }
});
exports.fileUpload = fileUpload;
