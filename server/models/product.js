import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  ownerID: { type: 'String', required: true },
  phoneNumber: { type: 'String', required: false },
  email: { type: 'String', required: false },
  address: { type: 'String', required: false },
  des: { type: 'String', required: false },
});

const productSchema = new Schema({
  fromStoreID: { type: 'String', required: true },
  productName: { type: 'String', required: true },
  productType: {
    categoryID: { type: 'String', required: true },
    categoryName: { type: 'String', required: true },
  },
  cost: { type: 'Number', required: true },
  isDiscount: { type: 'Boolean', required: true },
  tag: { type: 'Array', required: false },
  statusID: { type: 'String', required: true },
  rating: { type: 'Number', required: true },
  des: { type: 'String', required: false },
});
module.exports = mongoose.model('Store', storeSchema);
module.exports = mongoose.model('Product', productSchema);
