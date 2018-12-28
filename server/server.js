import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
const auth = require('./middleware/check-auth');

// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;
// Import required modules
app.set('view engine', 'ejs');
import posts from './routes/post.routes';
const users = require('./routes/user.routes');
const product = require('./routes/product.routes');
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(serverConfig.mongoURL, { useMongoClient: true }, (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    } else {
      console.log('Connect KIMODB MLab successful!');
    }
  });
}
app.use(auth);
// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static(path.resolve(__dirname, '../dist/client')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept , Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use('/api', posts);
app.use('/users', users);
app.use('/products',product);
app.use('/public', Express.static(path.join(__dirname, "/public")));
app.use('/script', Express.static(path.join(__dirname, "../view/script")));
app.use('/style', Express.static(path.join(__dirname, "../view/style")));

// start app
app.get('/', (req, res) => {
  res.render('../view/template/homePage.ejs');
});
app.get('/dms', (req, res) => {
  res.render('../view/dashboard/dms.ejs');
});
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
