import { UserInfo } from '../../models/person';
import bcrypt from 'bcryptjs';

module.exports = function userDataController() {

  const get_user_info = (req, res) => {
    (async function getUser (){
      try {
        const data = await UserInfo.findById(req.userData.id);
        if (Object.keys(data).length > 0) {

          if (!req.userData.id) {
            const ownData = await data.select('id username avatar cover_image cover_image_web sex');
              return res.status(200).json({
                code: '1000',
                message: 'OK',
                ownData,
              })
          }
          else return res.status(200).json({
            code: '1000',
            message: 'OK',
            data,
          })
        }
    } catch (err) {
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
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = new UserInfo({
        _id: req.userData.id,
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        cover_image: req.body.cover_image,
        cover_image_web: req.body.cover_image_web,
        password: hash,
        sex: req.body.sex,
    });
    const { avatar, cover_image, cover_image_web } = await newUser.save();
    return res.status(200).json({
      code: '1000',
      message: 'OK',
      data: {
        avatar,
        cover_image,
        cover_image_web,
      },
    });
    } catch (err) {
      return res.status(500).json({
        code: '1001',
        message: 'Can not connect to DB',
        err,
      });
    }
  }
  return {
    get_user_info,
    set_user_info,
  }
}
