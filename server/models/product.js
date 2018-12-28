import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryID: { type: 'String', required: true },
  categoryName: { type: 'String', required: true },
  has_child:{ type: 'Number', default : 0},
  has_brand: {type: 'Number', default: 0},
  has_size: {type: 'Number', default: 0},
  require_weight: {type: 'Number', default: 0},

});
const productSchema = new Schema({
  name: { type: 'String', required: true },
  ownerID: {type: 'String', required: true,},
  category_id: {type: 'String'},
  price: { type: 'Number', required: true },
  price_new: {type: 'Number', required: false},
  brand: { type: 'String', required: false, default: 'no brand' },
  discount: { type: 'Number', required: true },
  tag: { type: 'Array', required: false },
  statusID: { type: 'String', required: true },
  rating: { type: 'Number', required: true, default: 0 },
  images: { type: [String] },
  video: { type: 'String' },
  size: { type: 'String'},
  url: { type: 'String' },
  describled: { type: 'String', required: false },
  ship_from: { type: String },
  ship_from_id: {type: [String]},
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


module.exports = {
  //Store: mongoose.model('Store', storeSchema),
  Product: mongoose.model('Product', productSchema),
  Category: mongoose.model('Categoty', categorySchema),
  CommentProduct: mongoose.model('commentProduct', commentProductShema),
  //CommentStore: mongoose.model('commentStore', commentStoreShema),
};
