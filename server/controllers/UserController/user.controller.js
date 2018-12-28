const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../models/person');
const { Follow } = require('../../models/person')
var blacklist = require('express-jwt-blacklist');
const cloudinary = require('cloudinary');
const validate = require('../../util/validate')();
const mongoose = require('mongoose');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('9460d586c69f49c98f9045ecf4f83a28');
cloudinary.config({
  cloud_name: 'diy5llql1',
  api_key: '683633554975574',
  api_secret: 'evXhwzwgUdIqe4ngk27_Ipjtjig'
});
module.exports = function userController() {
  const signUp = (req, res) => {
    (async function addUser() {  // IIFE
      try {
        // if (!validate.validPhoneNumber(req.body.phonenumber)) {
        //   return res.status(401).json({
        //     code: '9995',
        //     message: 'Parameter value is invalid.',
        //   });
        // };
        const user = await User.find({ username: req.body.phonenumber });
        if (user.length >= 1) {
          return res.status(409).json({
            code: '9996',
            message: 'User existed',
          });
        }
        if(!req.body.phonenumber){
          if (!req.body.password) {
            return res.status(401).json({
              code: '1003',
              message: 'Parameter is not enought.',
            });
          }
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.phonenumber,
          password: hash,
        });
        const result = await newUser.save();
        const token = jwt.sign({
          // them 1 so truong khi deploy
          phonenumber: result.username,
          id: result.id,
        },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          });
        return res.status(201).json({
          code: '1000',
          message: 'OK',
          data:{
            token: token,
          },
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
        console.log(req.body.phonenumber);
        if(!req.body.phonenumber){
          return res.status(200).json({
            code: '1003',
            message: 'Parameter is not enought.',
          });
        }
        if (!req.body.password) {
          return res.status(200).json({
            code: '1003',
            message: 'Parameter is not enought.',
          });
        }
        // if (!validate.validPhoneNumber(req.body.phonenumber)) {
        //   return res.status(401).json({
        //     code: '1001',
        //     message: 'Parameter value is invalid.',
        //   });
        // };
        const user = await User.find({ username: req.body.phonenumber });
        if (user.length < 1) {
          return res.status(401).json({
            code: '1002',
            message: 'User is not existed',
          });
        }
        // const userData = await UserInfo.find({ id: user[0]._id });
        // var isActive = 1;
        // if (userData.length < 1) {
        //   isActive = -1;
        // }
        
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
            data: {
              id: user._id,
              userName: user.username,
              token: token,
             
            },
          });
        } else {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        };
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          code: '1001',
          message: 'Parameter value is invalid.',
        });
      }
    }()); // end here.
  };

  const signOut = (req, res) => {
    if (req.userData) res.redirect('/');
  }

  const logout = (req, res) => {
    try {
      if (!req.userData) {
        return res.status(401).json({
          code: 9998,
          message: 'Token is invalid',
        });
      }
      blacklist.revoke(req.userData);
      res.status(200).json({
        code: 1000,
        message: 'OK'
      });
    } catch (error) {
    }
  }

  const changePassword = (req, res) => {
    (async function changePass() {
      // console.log(req.userData);
      try {
        // s
        if (!req.userData) {
          return res.status(401).json({
            code: 9995,
            message: 'User is not validated',
          });
        }
        const password = req.body.password;
        const new_password = req.body.new_password;
        if (new_password.length <= 0) {
          return res.status(401).json({
            code: '9995',
            message: 'Parameter value is invalid.',
          });
        }
        const users = await User.find({ username: req.userData.phonenumber });

        if (users.length < 1) {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }
        const result = await bcrypt.compare(password, users[0].password);
        const hash_password = await bcrypt.hash(new_password, 10);
        if (result) {
          User.update({
            _id: users[0]._id
          },
            {
              password: hash_password
            },
            {}, (err, numAff) => {
              if (err) {
                res.status(500).json({
                  code: '9999',
                  message: 'Exception error',
                });
              } else {
                res.json({
                  code: '1000',
                  message: 'OK',
                });
              }
            });
        } else {
          return res.status(401).json({
            code: '9995',
            message: 'User is not validated',
          });
        }

      } catch (error) {
        console.log(error);
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          error,
        });
      }
    }());
  }

  const setUserFollow = (req, res) => {
    (async function userFollow() {
      try {
        if (!req.userData) {
          return res.status(401).json({
            code: 9995,
            message: 'User is not validated',
          });
        }
        const follower_id = req.body.follower_id.trim();
        const user_do_follow = req.userData.id.trim();
        // if (!(validate.validString(follower_id) && validate.validString(user_do_follow))) {
        //   return res.status(401).json({
        //     code: '9995',
        //     message: 'Parameter value is invalid.',
        //   });
        // };
        const follower = await Follow.find({ follower: follower_id, user_follow: user_do_follow });
        try {
          const isUserExist = await User.find({ _id: follower_id });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            code: 1013,
            message: 'Url User\'s is exist.',
          });
        }
        if (follower.length < 1) {
          const newFollower = new Follow({
            follower: follower_id,
            user_follow: user_do_follow,
          });
          newFollower.save((err, store) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                code: 9999,
                message: 'Exception error.',
              });
            }
            return res.status(200).json({
              code: 1000,
              message: 'OK',
              data: {
                status: '1'
              },
            });
          });

        } else {
          Follow.remove({ _id: follower[0]._id })
            .exec()
            .then(result => {
              return res.status(200).json({
                code: '1000',
                message: 'OK',
                data: {
                  status: '0',
                },
              });
            })
            .catch(err => {
              console.log(err);

              return res.status(500).json({
                code: 9999,
                message: 'Exception error.',
              });
            });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          code: 9999,
          message: 'Exception error.',
        });
      }
    }());
  }

  const getListFollowed = (req, res) => {
    (async function getList() {
      const userId = req.body.user_id.trim();
      const count = req.body.count.trim();
      if (isNaN(count)) {
        return res.status(401).json({
          code: '9995',
          message: 'Parameter value is invalid.',
        });
      }
      try {
        const isUserExist = await User.find({ _id: userId });
      } catch (error) {
        return res.status(500).json({
          code: 1013,
          message: 'Url User\'s is exist.',
        });
      }
      try {
        const listFollowed = await Follow.find({ follower: userId });
        if (listFollowed.length < 1) {
          return res.status(200).json({
            code: 1000,
            message: 'OK',
            data: {
            }
          });
        } else {
          var result = [];
          const maxLength = count > listFollowed.length ? listFollowed.length : count;
          for (let index = 0; index < maxLength; index++) {
            const element = listFollowed[index];
            const user_follow = await User.find({ _id: element.user_follow });
            let tempData;
            if (req.userData) {
              const is_followed = await Follow.find({ follower: user_follow[0]._id, user_follow: req.userData.id });
              if (is_followed.length < 1) {
                tempData = {
                  id: user_follow[0]._id,
                  username: user_follow[0].username,
                  followed: 0
                }
              } else {
                tempData = {
                  id: user_follow[0]._id,
                  username: user_follow[0].username,
                  followed: 1
                }
              }
            } else {
              tempData = {
                id: user_follow[0]._id,
                username: user_follow[0].username,
                followed: 0
              }
            }
            result.push(tempData);
          }
          return res.status(200).json({
            code: 1000,
            message: 'OK',
            data: result,
          })
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          code: 9999,
          message: 'Exception error.',
        });
      }

    }());
  }

  const getListFollowing = (req, res) => {
    (async function getList() {
      const userId = req.body.user_id.trim();
      const count = parseInt(req.body.count.trim());
      if (isNaN(count)) {
        return res.status(401).json({
          code: '9995',
          message: 'Parameter value is invalid.',
        });
      }
      try {
        const isUserExist = await User.find({ _id: userId });
      } catch (error) {
        return res.status(500).json({
          code: 1013,
          message: 'Url User\'s is exist.',
        });
      }
      try {
        const listFollowing = await Follow.find({ user_follow: userId });
        if (listFollowing.length < 1) {
          return res.status(200).json({
            code: 1000,
            message: 'OK',
            data: {
            }
          });
        } else {
          var result = [];
          const maxLength = count > listFollowing.length ? listFollowing.length : count;
          for (let index = 0; index < maxLength; index++) {
            const element = listFollowing[index];
            const follower = await User.find({ _id: element.follower });
            let tempData;
            tempData = {
              id: follower[0]._id,
              username: follower[0].username,
            }
            result.push(tempData);
          }
          return res.status(200).json({
            code: 1000,
            message: 'OK',
            data: result,
          })
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          code: 9999,
          message: 'Exception error.',
        });
      }

    }());
  }

  const getListNews = (req, res) => {
    (async function getNews() {
      newsapi.v2.topHeadlines({
        category: 'business',
        language: 'en',
        country: 'us'
      }).then(response => {
        var result = [];
        if (isNaN(req.body.count) && isNaN(req.body.index)) {
          return res.status(401).json({
            code: '9995',
            message: 'Parameter value is invalid.',
          });
        } else {
          const count = req.body.count;
          const index = req.body.index;
          var total = parseInt(count) + parseInt(index);
          for (let i = index; i < 20; i++) {
            console.log(i);
            const element =  response.articles[i];
            let tempData = {
              id: i,
              title: element.title,
              created: element.publishedAt,
            };
            result.push(tempData);
          }
          return res.status(200).json({
            code: 1000,
            message: 'OK',
            data: result,
          });
        }
      });
    }());
  }

  const uploadImage = (req, res) => {
    var file = req.file;
    console.log(req);
    // cloudinary.v2.uploader.upload("server/public/avatar/" + file.filename,
    //     function (error, result) {
    //     console.log(result.url);
    //     // console.log(result, error) ;
    //   });
    return res.status(200).json({});
  }

  return {
    signUp,
    signIn,
    signOut,
    uploadImage,
    logout,
    changePassword,
    setUserFollow,
    getListFollowed,
    getListNews,
    getListFollowing,
  };
};
