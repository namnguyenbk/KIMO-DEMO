const { Product } = require('../../models/product');
const { User } = require('../../models/person');
const { UserInfo } = require('../../models/person');
const { Category } = require('../../models/product');
const cloudinary = require('cloudinary');
const validate = require('../../util/validate')();
cloudinary.config({
  cloud_name: 'diy5llql1',
  api_key: '683633554975574',
  api_secret: 'evXhwzwgUdIqe4ngk27_Ipjtjig'
});
module.exports = function productController() {
  const getListProducts = (req, res) => {
    (async function findProduct() {
      let products;
      try {
        //const storeId = req.body.fromStoreID ? req.body.fromStoreID : /.*/;
        const brand = req.body.brand ? req.body.brand : /.*/;
        const price = req.body.price ? req.body.price : 100000000;
        const categoryId = req.body.category_id ? req.body.category_id : /.*/;
        const lastProductId = req.body.last_id ? req.body.last_id : -1;
        const count = req.body.count ? Number(req.body.count) : -1;
        let indexProd = -1;
        products = await Product.find().where('category_id').equals(categoryId)
          .where('brand')
          .equals(brand)
          .where('price')
          .lt(price);
        if (lastProductId !== -1 && count !== -1) {
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === lastProductId) {
              indexProd = i;
              break;
            }
          }
          products = products.filter((product, i) => i >= indexProd && i < (indexProd + count + 1));
        }
        return res.status(200).json({
          code: 1000,
          message: 'OK',
          data: products,
        });
      } catch (error) {
        console.log(error);
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
        if (req.body.id) {
          productDetail = await Product.find({_id: req.body.id});
          var owner = await UserInfo.find({id: productDetail[0].ownerID });
          var nameOwner;
          if (owner.length < 1) {
            owner = await User.find({_id: productDetail[0].ownerID});
            nameOwner = owner[0].username;
          }else{
            nameOwner = owner[0].firstname + owner[0].lastname;
          }
          const category = await Category.find({categoryID: productDetail[0].category_id});
          const data = {
            id: productDetail[0]._id,
            name: productDetail[0].name,
            price: productDetail[0].price,
            price_percent: productDetail[0].discount,
            describled: productDetail[0].describled,
            ships_from: productDetail[0].ships_from,
            like: 0,
            comment: 0,
            ships_from_id: productDetail[0].ships_from_id,
            image: productDetail[0].images,
            category: {
              id: productDetail[0].category_id,
              category_name: category[0].categoryName,
            },
            seller: {
              id: productDetail[0].ownerID,
              name: nameOwner,
            },
            url: 'products/' + productDetail[0]._id,
          };
          return res.status(200).json({
            code: 1000,
            message: 'OK',
            data: data,
          });
        }
        return res.status(404).json({
          code: 9992,
          message: 'Product is not existed',
        });
      } catch (error) {
        console.log(error);
        
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
            code: 9998,
            message: 'Token is invalid',
          });
        }

        const phonenumber = req.userData.phonenumber;
        const user = await User.find({ username: phonenumber });
        if (user.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }
        var files = req.files;
        var listUrl = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          await cloudinary.v2.uploader.upload("server/public/imageProduct/" + file.filename,
            function (error, result) {
              let urlAvatar = result.url;
              console.log(urlAvatar);
              listUrl.push(urlAvatar);
            });
        }
        const productName_ = req.body.name;
        const categoryid_ = req.body.category_id;
        const cost_ = req.body.price;
        if(cost_ < 0){
          return res.status(401).json({
            code: '9995',
            message: 'Parameter value is invalid.',
          });
        }
        const brand_ = req.body.brand_id;
        // const discount_ = '0%';
        const statusID_ = req.body.statusID? req.body.statusID: 'active';
        const des_ = req.body.describled;
        const listImgUrl_ = listUrl;
        const ship_From_id = req.body.ships_from_id ? req.body.ships_From_id : ['1','2','3'];
        const ship_From = req.body.ships_from;
        const newProduct = new Product({
          ownerID: user[0]._id,
          name: productName_,
          category_id: categoryid_,
          price: cost_,
          brand: brand_,
          discount: 0,
          statusID: statusID_,
          images: listImgUrl_,
          describled: des_,
          ship_from_id: ship_From_id,
          ship_from: ship_From,
        });

        newProduct.save((err, product) => {
          if (err) {
            console.log(err);
            
            return res.status(500).json({
              code: 9999,
              message: 'Parameter is not enought.',
            });
          }
          return res.status(200).json({
            code: 1000,
            message: 'OK',
            data: {
              id: newProduct._id,
              url: 'products/' + newProduct._id,
            },
          });
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          code: '1002',
          message: 'Parameter is not enought.',
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

  const getCategories = (req, res) => {
    (async function findProduct() {
      let categories;
      try {
        categories = await Category.find(req.body.parent_id ? { categoryID: req.body.parent_id } : {});
        const data = [];
        categories.forEach(item => {
          data.push({
            id: item.categoryID,
            name: item.categoryName,
            has_size: item.has_size,
            has_brand: item.has_brand,
            has_child: item.has_child,
            require_weight: item.require_weight,
          });
        });
        return res.status(200).json({
          code: 1000,
          message: 'OK',
          data: data,
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

  const editProduct = (req, res) => {
    (async function findProduct() {
      try {
        if (!req.userData) {
          return res.status(401).json({
            code: 9995,
            message: 'User is not validated',
          });
        }
        
        const productId = req.body.id;
        const name = req.body.name;
        const phoneNumber = req.userData.phonenumber;
        
        const users = await User.find({ username: phoneNumber });
        if (users.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }
        const products = await Product.find({
          _id: productId
        });

        if (products.length < 1) {
          return res.status(401).json({
            code: '9992',
            message: 'Product is not existed',
          });
        }
        if (req.userData.id != products[0].ownerID) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }
        var files = req.files;
        var listUrl = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          await cloudinary.v2.uploader.upload("server/public/imageProduct/" + file.filename,
            function (error, result) {
              let urlAvatar = result.url;
              listUrl.push(urlAvatar);
            });
        }
        const price = req.body.price;
        const size = req.body.product_size_id;
        const price_new = req.body.price_new;
        const describled = req.body.describled ? req.body.describled : products[0].describled;
        const brand_id = req.body.brand_id;
        const category_id = req.body.category_id;
        const ship_From = req.body.ship_From ? req.body.ship_From : products[0].ship_From;
        const ship_From_id = req.body.ship_From_id ? req.body.ship_From_id : products[0].ship_From_id;
        if( (price < 0) || (price_new < 0)){
          return res.status(401).json({
            code: '9995',
            message: 'Parameter value is invalid.',
          });
        }
        const statusID = req.body.statusID;
        Product.update({
          _id: productId,
          ownerID: users[0]._id
        },
          {
            price: price,
            name: name,
            size: size,
            price: price_new,
            describled: describled,
            brand: brand_id,
            category_id: category_id,
            ship_from: ship_From,
            ship_from_id: ship_From_id,
          },
          {}, (err, numAff) => {
            if (err) {
              res.json({
                code: '1001',
                message: 'Parameter is not enought.',
              });
            } else {
              res.json({
                code: '1000',
                message: 'OK',
              });
            }
          });
      } catch (error) {
        return res.status(500).json({
          code: '1001',
          message: 'Parameter is not enought.',
        });
      }
    }());
  };

  const deleteProduct = (req, res) => {
    (async function findProduct() {
      try {
        if (!req.userData) {
          console.log(req.userData);
          return res.status(401).json({
            code: 9995,
            message: 'user is not valid sign in or sign up to continue',
          });
        }

        const productId = req.body.id;
        const phoneNumber = req.userData.phonenumber;
        const users = await User.find({ username: phoneNumber });
        if (users.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }

        Product.deleteOne({
          _id: productId,
          ownerID: users[0]._id,
        }, function (err) {
          if (err) {
            return res.json({
              code: '9999',
              message: 'Exception error',
            });
          } else {
            return res.status(200).json({
              code: '1000',
              message: 'OK',
            });
          }
          // deleted at most one tank document
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
    addCateg,
    getCategories,
    editProduct,
    deleteProduct,
  };
};

/*
brand.substring(1, brand.length - 1)
*/
