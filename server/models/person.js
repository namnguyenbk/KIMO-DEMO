import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: 'String', required: true, unique: true,
    /* match: /^0(1\d{9}|9\d{8})$/  */
  },
  password: { type: 'String', required: true },
  statusid: {
    id: { type: 'String', required: false },
    des: { type: 'String', required: false },
  },
  permissionid: {
    id: { type: 'String', required: false },
    des: { type: 'String', required: false },
  },
  des: { type: 'String', required: false },
});

const userInfoSchema = new Schema({
  userid: { type: 'String', required: true },
  fisrtname: { type: 'String', required: true },
  midname: { type: 'String', required: false },
  lastname: { type: 'String', required: true },
  sex: { type: 'String', required: true },
  phonenumber: { type: 'String', required: false },
  email: { type: 'String', required: true },
  address: { type: 'String', required: false },
  des: { type: 'String', required: false },
});

const storeSchema = new Schema({
  ownerid: { type: 'String', required: true },
  phonenumber: { type: 'String', required: false },
  email: { type: 'String', required: false },
  address: { type: 'String', required: false },
  des: { type: 'String', required: false },
});

const productSchema = new Schema({
  fromstoreid: { type: 'String', required: true },
  productname: { type: 'String', required: true },
  producttype: {
    categoryid: { type: 'String', required: true },
    categoryname: { type: 'String', required: true },
  },
  cost: { type: 'Number', required: true },
  isdiscount: { type: 'Boolean', required: true },
  tag: { type: 'Object', required: false },
  statusid: { type: 'String', required: true },
  rating: { type: 'Number', required: true },
  des: { type: 'String', required: false },
});

module.exports = {
  User: mongoose.model('User', userSchema),
  UserInfo: mongoose.model('UserInfo', userInfoSchema),
  Store: mongoose.model('Store', storeSchema),
  Product: mongoose.model('Product', productSchema),
}

