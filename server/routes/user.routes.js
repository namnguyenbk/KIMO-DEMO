const { Router } = require('express');
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/UserController/user.controller')();
const userDataController = require('../controllers/UserController/userData.controller')();

// CRUD (create, read, update, delete) tuong duong signup, signin, userUpdate, userDelete

const userRouter = new Router();

userRouter.post('/signUp',checkAuth, userController.signUp);

userRouter.post('/signIn', checkAuth, userController.signIn);

userRouter.post('/signOut', checkAuth, userController.signOut);
userRouter.delete('/:userId', userController.userDelete);

/*  Sau nay them chuc nang update tai khoan khi da thong nhat Schema
  userRouter.patch('/:userId', userController.userUpdate);
};
*/
userRouter.post('/getInfo', checkAuth, userDataController.get_user_info);
userRouter.post('/setInfo', checkAuth, userDataController.set_user_info);


module.exports = userRouter;
