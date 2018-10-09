const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../models/person');

module.exports = function userController() {
  const signUp = (req, res) => {
    if (req.userData) res.redirect('/'); // can thao luan lai viec dieu huong
    (async function addUser() {  // IIFE
      try {
        const user = await User.find({ username: req.body.phonenumber });
        if (user.length >= 1) {
          return res.status(409).json({
            message: ' Phone exists ',
          });
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.phonenumber,
          password: hash,
        });
        const result = await newUser.save();
        // console.log(result);
        return res.status(201).json({
          message: 'User created',
          result,
        });
      } catch (err) {
        // console.log(err);
        return res.status(500).json({
          err,
        });
      }
    }());
  };

  const signIn = (req, res) => {
    if (req.userData) res.redirect('/');
    (async function authUser() {
      try {
        const user = await User.find({ username: req.body.phonenumber });
        if (user.length < 1) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        const result = await bcrypt.compare(req.body.password, user[0].password);
        if (result) {
          const token = jwt.sign({
            // them 1 so truong khi deploy
            phonenumber: user[0].phonenumber,
          },
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            });
          return res.status(200).json({
            message: 'Auth successful',
            token, // save vao local storage va dung ajax de set header = authorization : bearer token
          });
        } throw new Error();
      } catch (err) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
    }()); // end here.
  };

  const userDelete = (req, res) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'User deleted',
          result,
        });
      })
      .catch(err => {
        return res.send(500).json({
          error: err,
        });
      });
  };
  return {
    signUp,
    signIn,
    userDelete,
  };
};
