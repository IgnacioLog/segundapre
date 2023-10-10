const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  amount: Number,
  date: {
    type: Date,
    default: Date.now
  },
  method: String
});

module.exports = mongoose.model('Payment', paymentSchema);
