const { Router } = require('express');
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/UserController/user.controller')();

// CRUD (create, read, update, delete) tuong duong signup, signin, userUpdate, userDelete

const userRouter = new Router();

userRouter.post('/signUp', userController.signUp);

userRouter.post('/signIn', userController.signIn);

userRouter.delete('/:userId', userController.userDelete);

/*  Sau nay them chuc nang update tai khoan khi da thong nhat Schema
  userRouter.patch('/:userId', userController.userUpdate);
};
*/

module.exports = userRouter;
