import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a ship name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  category: {
    type: String,
    default: 'Legendary Pirate Ships',
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
