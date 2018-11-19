const { Product } = require('../../models/product');
const { User } = require('../../models/person');
const { Store } = require('../../models/product');
const { Category } = require('../../models/product');
module.exports = function productController() {
  const getListProducts = (req, res) => {
    (async function findProduct() {
      let products;
      try {
        const storeId = req.body.fromStoreID ? req.body.fromStoreID : /.*/;
        const brand = req.body.brand ? req.body.brand : /.*/;
        const price = req.body.price ? req.body.price : 100000000;
        const categoryId = req.body.category_id ? req.body.category_id : /.*/;
        const lastProductId = req.body.last_id ? req.body.last_id : -1;
        const count = req.body.count ? Number(req.body.count) : -1;
        let indexProd = -1;
        products = await Product.find().where('productType.categoryID').equals(categoryId)
          .where('brand')
          .equals(brand)
          .where('cost')
          .lt(price)
          .where('fromStoreID')
          .equals(storeId);
        if (lastProductId !== -1 && count !== -1) {
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === lastProductId) {
              indexProd = i;
              break;
            }
          }
          products = products.filter((product, i) => i >= indexProd && i < (indexProd + count + 1));
        }
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  };

  const getProductDetail = (req, res) => {
    (async function findProduct() {
      let productDetail;
      try {
        if (req.body.productId) {
          productDetail = await Product.findById(req.body.productId);
          return res.status(200).json(productDetail);
        }
        return res.status(404).json({
          code: 9992,
          message: 'product is not existed',
        });
      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  };

  const addProduct = (req, res) => {
    (async function findProduct() {
      try {
        if (!req.userData) {
          return res.status(401).json({
            code: 9995,
            message: 'user is not valid sign in or sign up to continue',
          });
        }
        
        const phonenumber = req.userData.phonenumber;
        console.log(phonenumber);
        const stores = await Store.find().where('phoneNumber').equals(phonenumber);
        if (stores.length < 1) {
          return res.status(401).json({
            code: 9995,
            message: 'no store found',
          });
        }
        const fromStoreID_ = stores[0]._id;
        const productName_ = req.body.productName;
        const categoryid_ = req.body.category_id;
        const cost_ = req.body.cost;
        const brand_ = req.body.brand;
        const discount_ = req.body.discount;
        const statusID_ = req.body.statusID;
        const des_ = req.body.des;
        const listImgUrl_ = req.body.listImgUrl? req.body.listImgUrl : [];
        const ship_From_ = req.body.ship_From? req.body.ship_From : [];
        const newProduct = new Product({
          fromStoreID: fromStoreID_,
          productName: productName_,
          productType: {
            categoryID: categoryid_,
          },
          cost: cost_,
          brand: brand_,
          discount: discount_,
          statusID: statusID_,
          details: {
            images: listImgUrl_,
            des: des_,
            ship_From: ship_From_,
          },
        });

        newProduct.save((err, product) => {
          if (err) {
            return res.status(500).json({
              code: 9999,
              message: 'can not save to database',
            });
          }
          return res.status(200).json({
            code: 1000,
            message: 'add product successfully',
            product,
          });
        });
      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  };

  const addStore = (req, res) => {
    (async function findProduct() {
      try {
        if (!req.userData) {
          console.log(req.userData);
          return res.status(401).json({
            code: 9995,
            message: 'user is not valid sign in or sign up to continue',
          });
        }
        const userPhoneNumber = req.body.phonenumber;
        console.log(req.body);
        const user = await User.find({ username: userPhoneNumber });
        if (user.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }
        const newStore = new Store({
          ownerID: user[0]._id,
          phoneNumber: userPhoneNumber,
          email: req.body.email,
          address: req.body.address,
          des: req.body.des,
        });

        newStore.save((err, store) => {
          if (err) {
            return res.status(500).json({
              code: 9999,
              message: 'can not save to database',
            });
          }

          return res.status(200).json({
            code: 1000,
            message: 'add product successfully',
            store,
          });
        });
      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  };


  const addCateg = (req, res) => {
    (async function findProduct() {
      try {
        const categoryName_ = req.body.categoryName;
        const categoryID_ = req.body.categoryID;
        const newCategory = new Category({
          categoryID: categoryID_,
          categoryName: categoryName_,
        });

        newCategory.save((err, store) => {
          if (err) {
            return res.status(500).json({
              code: 9999,
              message: 'can not save to database',
            });
          }

          return res.status(200).json({
            code: 1000,
            message: 'add categ successfully',
            store,
          });
        });

      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  };

  const getCategories = (req, res)=>{
    (async function findProduct() {
      let categories;
      try {
        categories = await Category.find();
        return res.status(200).json({
          code: 1000,
          message: 'get list categories successfull!',
          data: categories,
        });
      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  };

  const editProduct = (req, res)=>{
    (async function findProduct() {
      try {
        if (!req.userData) {
          console.log(req.userData);
          return res.status(401).json({
            code: 9995,
            message: 'user is not valid sign in or sign up to continue',
          });
        }

        const productId = req.body.productId;
        const phoneNumber = req.userData.phonenumber;
        const users = await User.find({ username: phoneNumber });
        if (users.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }
        const stores = await Store.find({ownerID: users[0]._id});
        if (stores.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'No store found! create new store!',
          });
        }
        const products = await Product.find({
          _id: productId,
          fromStoreID: stores[0]._id,
        });

        if(products.length < 1){
          return res.status(401).json({
            code: '9995',
            message: 'No product found!',
          });
        }

        const fromStoreID_ = stores[0]._id;
        const productName_ = req.body.productName;
        const categoryid_ = req.body.category_id;
        const cost_ = req.body.cost;
        const brand_ = req.body.brand;
        const discount_ = req.body.discount;
        const statusID_ = req.body.statusID;
        const des_ = req.body.des;
        
        products[0].set(
          {
            fromStoreID: fromStoreID_,
            productName: productName_,
            productType: {
              categoryID: categoryid_,
            },
            cost: cost_,
            brand: brand_,
            discount: discount_,
            statusID: statusID_,
            details: {
              des: des_,
            },
          }
        );
        products[0].save(function (err, updateProduct) {
          if (err) return handleError(err);
          res.send(updateProduct);
        });

        res.status(200).json({
          mes: 'ok',
          product: products[0],
        });

        console.log(req.userData);
        res.json({
          mes: 'ok',
        });
      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  };

  const deleteProduct = (req, res)=>{
    (async function findProduct() {
      try {
        if (!req.userData) {
          console.log(req.userData);
          return res.status(401).json({
            code: 9995,
            message: 'user is not valid sign in or sign up to continue',
          });
        }

        const productId = req.body.productId;
        const phoneNumber = req.userData.phonenumber;
        const users = await User.find({ username: phoneNumber });
        if (users.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }
        const stores = await Store.find({ownerID: users[0]._id});
        if (stores.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'No store found! create new store!',
          });
        }
        // const products = await Product.find({
        //   _id: productId,
        //   fromStoreID: stores[0]._id,
        // });

        // if(products.length < 1){
        //   return res.status(401).json({
        //     code: '9995',
        //     message: 'No product found!',
        //   });
        // }

        Product.deleteOne({
          _id: productId,
          fromStoreID: stores[0]._id,
        },function (err) {
          if (err) return handleError(err);
          // deleted at most one tank document
        });


        res.status(200).json({
          mes: 'ok',
          //product: products[0],
          deleted: true,
        });

        console.log(req.userData);
        res.json({
          mes: 'ok',
        });
      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  };

  return {
    getListProducts,
    getProductDetail,
    addProduct,
    addStore,
    addCateg,
    getCategories,
    editProduct,
    deleteProduct,
  };
};

/*
brand.substring(1, brand.length - 1)
*/
