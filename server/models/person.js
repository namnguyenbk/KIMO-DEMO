import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: 'String', required: true },
  passWord: { type: 'String', required: true },
  statusID: {
    id: { type: 'String', required: true },
    des: { type: 'String', required: false },
  },
  permissionID: {
    id: { type: 'String', required: true },
    des: { type: 'String', required: true },
  },
  des: { type: 'String', required: false },
});

const userInfoSchema = new Schema({
  userID: { type: 'String', required: true },
  fisrtName: { type: 'String', required: true },
  midName: { type: 'String', required: false },
  lastName: { type: 'String', required: true },
  sex: { type: 'String', required: true },
  phoneNumber: { type: 'String', required: false },
  email: { type: 'String', required: true },
  address: { type: 'String', required: false },
  des: { type: 'String', required: false },
});

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
  tag: { type: 'Object', required: false },
  statusID: { type: 'String', required: true },
  rating: { type: 'Number', required: true },
  des: { type: 'String', required: false },
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('UserInfo', userInfoSchema);
module.exports = mongoose.model('Store', storeSchema);
module.exports = mongoose.model('Product', productSchema);
