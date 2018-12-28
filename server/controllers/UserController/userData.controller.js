import { UserInfo } from '../../models/person';
import bcrypt from 'bcryptjs';

const cloudinary = require('cloudinary');
const validate = require('../../util/validate')();
cloudinary.config({
  cloud_name: 'diy5llql1',
  api_key: '683633554975574',
  api_secret: 'evXhwzwgUdIqe4ngk27_Ipjtjig'
});
module.exports = function userDataController() {
  const get_user_info = (req, res) => {
    (async function getUser() {
      try {
        if (req.body.user_id) {
          const dataInfo = await UserInfo.find({ id: req.body.user_id });
          if (dataInfo.length < 1) {
            return res.status(200).json({
              code: '1000',
              message: 'OK',
              data: {
              },
            });
          }
          const user = dataInfo[dataInfo.length - 1];
          return res.status(200).json({
            code: '1000',
            message: 'OK',
            data: {
              id: user.id,
              email: user.email,
              username: user.username,
              phonenumber: user.phonenumber,
              status: user.status,
              avatar: user.avatar,
              firstname: user.firstname,
              lastname: user.lastname,
              address: user.lastname,
              city: user.city,
              online: 0,
            }
          });
        }
        else {
          if (!req.userData) {
            return res.status(401).json({
              code: '1003',
              message: 'Parameter is not enought.',
            });
          } else {
            const dataInfo = await UserInfo.find({ id: req.userData.id });
            const ownData = dataInfo[dataInfo.length - 1];
            return res.status(200).json({
              code: '1000',
              message: 'OK',
              data: {
                id: ownData.id,
                email: ownData.email,
                username: ownData.username,
                phonenumber: ownData.phonenumber,
                status: ownData.status,
                avatar: ownData.avatar,
                firstname: ownData.firstname,
                lastname: ownData.lastname,
                address: ownData.lastname,
                city: ownData.city,
                online: 0
              },
            })
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          code: '1001',
          message: 'Can not connect to DB',
          err,
        });
      }
    }());
  }

  const set_user_info = async (req, res) => {
    try {
      if (!req.userData) {
        return res.status(401).json({
          code: 9995,
          message: 'User is not validated',
        });
      }
      var file = req.file;
      var urlAvatar;
      (async function updateInfo() {
        await cloudinary.v2.uploader.upload("server/public/avatar/" + file.filename,
          function (error, result) {
            urlAvatar = result.url;
            console.log(urlAvatar);
          });
        if (!(validate.validEmail(req.body.email))) {

          return res.status(401).json({
            code: '9995',
            message: 'Parameter value is invalid.',
          });
        }

        const newUser = new UserInfo({
          id: req.userData.id,
          username: req.body.username,
          phonenumber: req.userData.phonenumber,
          email: req.body.email,
          avatar: urlAvatar,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          address: req.body.address,
          city: req.body.city,
          status: req.body.status,
          sex: req.body.sex,
        });
        await newUser.save();
        return res.status(200).json({
          code: '1000',
          message: 'OK',
          data: {
            avatar: urlAvatar,
          },
        });
      }());

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        code: '1002',
        message: 'Parameter is not enought.',
        err,
      });
    }
  }
  return {
    get_user_info,
    set_user_info,
  }
}
