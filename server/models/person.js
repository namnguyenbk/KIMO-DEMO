import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    /* match: /^0(1\d{9}|9\d{8})$/  */
  },
  countryCode: {
    type: String,
    default: '+84',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  authyId: String,
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
  firstname: { type: String },
  midname: { type: String,  },
  lastname: { type: String,  },
  sex: { type: String,  },
  phonenumber: { type: String,  },
  email: { type: String, },
  address: { type: String,  },
  des: { type: String, },
  cover_image: { type: String,  },
  cover_image_web: { type: String, },
  avatar: { type: String, },
  username: { type: String,},
  url: { type: String,  },
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

