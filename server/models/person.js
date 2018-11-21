import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    /* match: /^0(1\d{9}|9\d{8})$/  */
  },
  countryCode: {
    type: String,
    default: '+84',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  authyId: String,
  password: { type: 'String', required: true },
  statusid: {
    id: { type: 'String', required: false },
    des: { type: 'String', required: false },
  },
  permissionid: {
    id: { type: 'String', required: false },
    des: { type: 'String', required: false },
  },
  des: { type: 'String', required: false },
});

const userInfoSchema = new Schema({
  firstname: { type: String },
  midname: { type: String,  },
  lastname: { type: String,  },
  sex: { type: String,  },
  phonenumber: { type: String,  },
  email: { type: String, },
  address: { type: String,  },
  des: { type: String, },
  cover_image: { type: String,  },
  cover_image_web: { type: String, },
  avatar: { type: String, },
  username: { type: String,},
  url: { type: String,  },
});



module.exports = {
  User: mongoose.model('User', userSchema),
  UserInfo: mongoose.model('UserInfo', userInfoSchema),
}

