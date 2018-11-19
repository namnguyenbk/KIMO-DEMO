const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../models/person');

module.exports = function userController() {
  const signUp = (req, res) => {
    (async function addUser() {  // IIFE
      try {
        const user = await User.find({ username: req.body.phonenumber });
        if (user.length >= 1) {
          return res.status(409).json({
            code: '9996',
            message: 'User existed',
          });
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.phonenumber,
          password: hash,
        });
        const result = await newUser.save();
        const token = jwt.sign({
          // them 1 so truong khi deploy
          phonenumber: result.username ,
          id: result.id,
        },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          });
        return res.status(201).json({
          code: '1000',
          message: 'OK',
          result,
         token,
        });
      } catch (err) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          err,
        });
      }
    }());
  };

  const signIn = (req, res) => {
    if (req.userData) return res.redirect('/');
    (async function authUser() {
      try {
        const user = await User.find({ username: req.body.phonenumber });
        if (user.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
            user,
          });
        }
        const result = await bcrypt.compare(req.body.password, user[0].password);
        if (result) {
          const token = jwt.sign({
            // them 1 so truong khi deploy
            phonenumber: user[0].username,
            id: user[0].id,
          },
          process.env.JWT_KEY,
            {
              expiresIn: '1h',
            });
          return res.status(200).json({
            code: '1000',
            message: 'OK',
            token, // save vao local storage va dung ajax de set header = authorization : bearer token
          });
        } else {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        };
      } catch (err) {
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          err,
        });
      }
    }()); // end here.
  };

  const signOut = (req, res) => {
    if (req.userData) res.redirect('/');
  }

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
    signOut,
    userDelete,
  };
};
