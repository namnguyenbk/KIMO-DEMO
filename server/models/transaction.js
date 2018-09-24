import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  statusID: { type: 'String', required: true },
  fromDate: { type: 'Date', required: true },
  thruDate: { type: 'Date', required: true },
  amount: { type: 'Number', required: true },
  des: { type: 'String', required: false },
});

const orderDetailSchema = new Schema({
  orderID: { type: 'String', required: true },
  productID: { type: 'String', required: true },
  fromDate: { type: 'Date', required: true },
  thruDate: { type: 'Date', required: true },
  des: { type: 'String', required: false },
});
module.exports = mongoose.model('Order', orderSchema);
module.exports = mongoose.model('OrderDetail', orderDetailSchema);
