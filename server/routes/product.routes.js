 const { Router } = require('express');
 const productController = require('../controllers/ProductController/product.controller')();
 const multer = require('multer');
 var path = require('path');
 var storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'server/public/imageProduct')
   },
   filename: (req, file, cb) => {
     cb(null, file.fieldname + '-' + Date.now())
   },
 });
 var upload = multer({
   storage: storage,
   fileFilter: function (req, file, callback) {
     var ext = path.extname(file.originalname);
     if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
       return callback(new Error('Only images are allowed'));
     }
     return callback(null, true);
   }
 });
//

 const productRouter = new Router();

 productRouter.post('/get_list_products', productController.getListProducts);
 productRouter.post('/get_product', productController.getProductDetail);// get product detail
 productRouter.post('/add_product', upload.array('image',4),productController.addProduct);
 //productRouter.post('/addStore', productController.addStore);// tạm thời đang phải dử dụng không thể bỏ ngay được
 productRouter.post('/addCateg', productController.addCateg);// chi để test khi cần ko sử dụng
 productRouter.post('/get_categories', productController.getCategories);
 productRouter.post('/edit_products',upload.array('image',4), productController.editProduct);
 productRouter.post('/del_product', productController.deleteProduct);

 module.exports = productRouter;
