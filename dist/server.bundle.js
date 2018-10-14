/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _compression = __webpack_require__(4);

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = __webpack_require__(5);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _post = __webpack_require__(7);

var _post2 = _interopRequireDefault(_post);

var _config = __webpack_require__(13);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize the Express App
var app = new _express2.default();

// Set Development modes checks
var isDevMode = process.env.NODE_ENV === 'development' || false;
var isProdMode = process.env.NODE_ENV === 'production' || false;
// Import required modules
app.set('view engine', 'ejs');

var users = __webpack_require__(14);


// Set native promises as mongoose promise
_mongoose2.default.Promise = global.Promise;

// MongoDB Connection

if (process.env.NODE_ENV !== 'test') {
  _mongoose2.default.connect(_config2.default.mongoURL, function (error) {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    } else {
      console.log("Connect KIMODB MLab successful!");
    }
  });
}

// Apply body Parser and server public assets and routes
app.use((0, _compression2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist/client')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept , Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use('/api', _post2.default);
app.use('/users', users);
app.use('/public', _express2.default.static(_path2.default.join(__dirname, "/public")));
app.use('/materialBT', _express2.default.static(_path2.default.join(__dirname, "../view/style/materialBT")));

// start app
app.get('/', function (req, res) {
  res.render('../view/template/homePage.ejs');
});
app.listen(_config2.default.port, function (error) {
  if (!error) {
    console.log('MERN is running on port: ' + _config2.default.port + '! Build something amazing!'); // eslint-disable-line
  }
});

exports.default = app;
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _post = __webpack_require__(8);

var PostController = _interopRequireWildcard(_post);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);
router.route('/nam').post(PostController.firstAPI);

exports.default = router;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = getPosts;
exports.addPost = addPost;
exports.getPost = getPost;
exports.deletePost = deletePost;
exports.firstAPI = firstAPI;

var _post = __webpack_require__(9);

var _post2 = _interopRequireDefault(_post);

var _cuid = __webpack_require__(10);

var _cuid2 = _interopRequireDefault(_cuid);

var _limax = __webpack_require__(11);

var _limax2 = _interopRequireDefault(_limax);

var _sanitizeHtml = __webpack_require__(12);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
function getPosts(req, res) {
  _post2.default.find().sort('-dateAdded').exec(function (err, posts) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts: posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  var newPost = new _post2.default(req.body.post);

  // Let's sanitize inputs
  newPost.title = (0, _sanitizeHtml2.default)(newPost.title);
  newPost.name = (0, _sanitizeHtml2.default)(newPost.name);
  newPost.content = (0, _sanitizeHtml2.default)(newPost.content);

  newPost.slug = (0, _limax2.default)(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = (0, _cuid2.default)();
  newPost.save(function (err, saved) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
function getPost(req, res) {
  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
function deletePost(req, res) {
  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(function () {
      res.status(200).end();
    });
  });
}
/**
 * Test API
 * @param req
 * @param res
 * @returns void
 */
function firstAPI(req, res) {
  // const name = req.params.name;
  // res.json({ name });
  // Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }

  //   post.remove(() => {
  //     res.status(200).end();
  //   });
  // });
  res.send('Nguyen Danh Nam');
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
});

exports.default = _mongoose2.default.model('Post', postSchema);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("cuid");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("limax");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("sanitize-html");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var dbuser = 'namnguyen98';
var dbpassword = 'namnguyen98';

var MONGODB_URI = 'mongodb://' + dbuser + ':' + dbpassword + '@ds055680.mlab.com:55680/kimodb';

var config = {
  mongoURL: process.env.MONGO_URL || MONGODB_URI,
  port: process.env.PORT || 8000
};

exports.default = config;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    Router = _require.Router;

var checkAuth = __webpack_require__(15);
var userController = __webpack_require__(16)();

// CRUD (create, read, update, delete) tuong duong signup, signin, userUpdate, userDelete

var userRouter = new Router();

userRouter.post('/signUp', userController.signUp);

userRouter.post('/signIn', userController.signIn);

userRouter.delete('/:userId', userController.userDelete);

/*  Sau nay them chuc nang update tai khoan khi da thong nhat Schema
  userRouter.patch('/:userId', userController.userUpdate);
};
*/

module.exports = userRouter;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jwt = __webpack_require__(2);

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    // thao luan xem redirect sang dau ( co the la '/' )
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwt = __webpack_require__(2);
var bcrypt = __webpack_require__(17);

var _require = __webpack_require__(18),
    User = _require.User;

module.exports = function userController() {
  var signUp = function signUp(req, res) {
    if (req.userData) res.redirect('/'); // can thao luan lai viec dieu huong
    (function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var user, hash, newUser, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return User.find({ username: req.body.phonenumber });

              case 3:
                user = _context.sent;

                if (!(user.length >= 1)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(409).json({
                  message: ' Phone exists '
                }));

              case 6:
                _context.next = 8;
                return bcrypt.hash(req.body.password, 10);

              case 8:
                hash = _context.sent;
                newUser = new User({
                  username: req.body.phonenumber,
                  password: hash
                });
                _context.next = 12;
                return newUser.save();

              case 12:
                result = _context.sent;
                return _context.abrupt('return', res.status(201).json({
                  message: 'User created',
                  result: result
                }));

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', res.status(500).json({
                  err: _context.t0
                }));

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 16]]);
      }));

      function addUser() {
        return _ref.apply(this, arguments);
      }

      return addUser;
    })()();
  };

  var signIn = function signIn(req, res) {
    if (req.userData) res.redirect('/');
    (function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var user, result, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return User.find({ username: req.body.phonenumber });

              case 3:
                user = _context2.sent;

                if (!(user.length < 1)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', res.status(401).json({
                  message: 'Auth failed'
                }));

              case 6:
                _context2.next = 8;
                return bcrypt.compare(req.body.password, user[0].password);

              case 8:
                result = _context2.sent;

                if (!result) {
                  _context2.next = 12;
                  break;
                }

                token = jwt.sign({
                  // them 1 so truong khi deploy
                  phonenumber: user[0].phonenumber
                }, process.env.JWT_KEY, {
                  expiresIn: '1h'
                });
                return _context2.abrupt('return', res.status(200).json({
                  message: 'Auth successful',
                  token: token // save vao local storage va dung ajax de set header = authorization : bearer token
                }));

              case 12:
                throw new Error();

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', res.status(401).json({
                  message: 'Auth failed'
                }));

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 15]]);
      }));

      function authUser() {
        return _ref2.apply(this, arguments);
      }

      return authUser;
    })()(); // end here.
  };

  var userDelete = function userDelete(req, res) {
    User.remove({ _id: req.params.userId }).exec().then(function (result) {
      res.status(200).json({
        message: 'User deleted',
        result: result
      });
    }).catch(function (err) {
      return res.send(500).json({
        error: err
      });
    });
  };
  return {
    signUp: signUp,
    signIn: signIn,
    userDelete: userDelete
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
  username: {
    type: 'String', required: true, unique: true
    /* match: /^0(1\d{9}|9\d{8})$/  */
  },
  password: { type: 'String', required: true },
  statusid: {
    id: { type: 'String', required: false },
    des: { type: 'String', required: false }
  },
  permissionid: {
    id: { type: 'String', required: false },
    des: { type: 'String', required: false }
  },
  des: { type: 'String', required: false }
});

var userInfoSchema = new Schema({
  userid: { type: 'String', required: true },
  fisrtname: { type: 'String', required: true },
  midname: { type: 'String', required: false },
  lastname: { type: 'String', required: true },
  sex: { type: 'String', required: true },
  phonenumber: { type: 'String', required: false },
  email: { type: 'String', required: true },
  address: { type: 'String', required: false },
  des: { type: 'String', required: false }
});

var storeSchema = new Schema({
  ownerid: { type: 'String', required: true },
  phonenumber: { type: 'String', required: false },
  email: { type: 'String', required: false },
  address: { type: 'String', required: false },
  des: { type: 'String', required: false }
});

var productSchema = new Schema({
  fromstoreid: { type: 'String', required: true },
  productname: { type: 'String', required: true },
  producttype: {
    categoryid: { type: 'String', required: true },
    categoryname: { type: 'String', required: true }
  },
  cost: { type: 'Number', required: true },
  isdiscount: { type: 'Boolean', required: true },
  tag: { type: 'Object', required: false },
  statusid: { type: 'String', required: true },
  rating: { type: 'Number', required: true },
  des: { type: 'String', required: false }
});

module.exports = {
  User: _mongoose2.default.model('User', userSchema),
  UserInfo: _mongoose2.default.model('UserInfo', userInfoSchema),
  Store: _mongoose2.default.model('Store', storeSchema),
  Product: _mongoose2.default.model('Product', productSchema)
};

/***/ })
/******/ ]);