const dbuser = 'namnguyen98';
const dbpassword = 'namnguyen98';

const MONGODB_URI = `mongodb://${dbuser}:${dbpassword}@ds055680.mlab.com:55680/kimodb`;

const config = {
  mongoURL: process.env.MONGO_URL || MONGODB_URI,
  port: process.env.PORT || 8000,
};


export default config;
