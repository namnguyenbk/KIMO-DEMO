import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  ownerID: { type: 'String', required: true },
  phoneNumber: { type: 'String', required: false },
  email: { type: 'String', required: false },
  address: { type: 'String', required: false },
  des: { type: 'String', required: false },
});
const categorySchema = new Schema({
  categoryID: { type: 'String', required: true },
  categoryName: { type: 'String', required: true },
});
const productSchema = new Schema({
  fromStoreID: { type: 'String', required: true },
  productName: { type: 'String', required: true },

  productType: {
    categoryID: { type: 'String', required: true },
  },

  cost: { type: 'Number', required: true },
  brand: { type: 'String', required: false, default: 'no brand' },
  discount: { type: 'Number', required: true },
  tag: { type: 'Array', required: false },
  statusID: { type: 'String', required: true },
  rating: { type: 'Number', required: true, default: 0 },

  details: {
    images: { type: [String] },
    video: { type: 'String' },
    url: { type: 'String' },
    des: { type: 'String', required: false },
    ship_From: { type: [String] },
  },

  created: {
    type: Date, default: Date.now
  },
  like: {
    type: 'Number', required: true, default: 0
  },
  commentId: {
    type: 'String', required: false,
  },

});

const commentProductShema = new Schema({
  posterId: { type: String, required: true },
  comment: { type: String, default: '' },
  created: {
    type: Date, default: Date.now
  },
});

const commentStoreShema = new Schema({
  posterId: { type: String, required: true },
  comment: { type: String, default: '' },
  created: {
    type: Date, default: Date.now
  },
});

module.exports = {
  Store: mongoose.model('Store', storeSchema),
  Product: mongoose.model('Product', productSchema),
  Category: mongoose.model('Categoty', categorySchema),
  CommentProduct: mongoose.model('commentProduct', commentProductShema),
  CommentStore: mongoose.model('commentStore', commentStoreShema),
};
