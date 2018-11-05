 const { Router } = require('express');
 const productController = require('../controllers/ProductController/product.controller')();

//

 const productRouter = new Router();

 productRouter.post('/getListProducts', productController.getListProducts);
 productRouter.post('/getProductDetail', productController.getProductDetail);
 productRouter.post('/addProduct', productController.addProduct);
 productRouter.post('/addStore', productController.addStore);

 module.exports = productRouter;
