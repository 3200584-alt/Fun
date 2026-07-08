import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true,
    default: 0.0
  },
  discount: {
    type: Number,
    required: true,
    default: 0.0
  },
  total: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingAddress: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  deliveryMethod: {
    type: String,
    required: true,
    default: 'News Coo Delivery'
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Berry COD'
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
