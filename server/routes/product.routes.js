 const { Router } = require('express');
 const productController = require('../controllers/ProductController/product.controller')();

//

 const productRouter = new Router();

 productRouter.post('/get_list_products', productController.getListProducts);
 productRouter.post('/get_product', productController.getProductDetail);// get product detail
 productRouter.post('/add_product', productController.addProduct);
 //productRouter.post('/addStore', productController.addStore);// tạm thời đang phải dử dụng không thể bỏ ngay được
 productRouter.post('/addCateg', productController.addCateg);// chi để test khi cần ko sử dụng
 productRouter.post('/get_categories', productController.getCategories);
 productRouter.post('/edit_product', productController.editProduct);
 productRouter.post('/del_product', productController.deleteProduct);

 module.exports = productRouter;
