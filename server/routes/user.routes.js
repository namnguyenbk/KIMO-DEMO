const { Router } = require('express');
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/UserController/user.controller')();
const userDataController = require('../controllers/UserController/userData.controller')();
const multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/public/avatar')
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

// CRUD (create, read, update, delete) tuong duong signup, signin, userUpdate, userDelete

const userRouter = new Router();

userRouter.post('/signUp', checkAuth, userController.signUp);
userRouter.post('/signIn', checkAuth, userController.signIn);
userRouter.post('/logout', checkAuth, userController.logout);
userRouter.post('/uploadImage', upload.single('image'), userController.uploadImage);
userRouter.post('/set_user_follow', checkAuth, userController.setUserFollow);
userRouter.post('/change_password',checkAuth, userController.changePassword);
userRouter.post('/get_list_followed', userController.getListFollowed);
userRouter.post('/get_list_following', userController.getListFollowing);
userRouter.post('/get_list_news', userController.getListNews);
userRouter.post('/get_user_info', checkAuth, userDataController.get_user_info);
userRouter.post('/set_user_info',upload.single('avatar'), checkAuth, userDataController.set_user_info);
module.exports = userRouter;
