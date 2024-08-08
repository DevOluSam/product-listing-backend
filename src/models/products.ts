import mongoose, { Document, Schema } from 'mongoose';

interface IProduct {
  name: string;
  description: string;
  price: string;
  image: string;
  createdBy : mongoose.Types.ObjectId;
}

interface IProductDocument extends IProduct, Document {}

const productSchema = new Schema<IProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  createdBy : { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Product = mongoose.model<IProductDocument>('Product', productSchema);

export default Product;
