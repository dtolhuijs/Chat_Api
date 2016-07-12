// index.js

const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
// const errors = require('feathers-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const service = require('feathers-mongoose');

const Message = require('./models/message')

// Tell mongoose to use native promises
// See http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const mongo_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapi';
mongoose.connect(mongo_url);

// Create a feathers instance.
const app = feathers()
  // Enable Socket.io
  .configure(socketio())
  // Enable REST services
  .configure(rest())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));

app.use('/messages', service({
  Model: Message,
  paginate: {
    default: 30,
    max: 50
  }
}));

// A basic error handler, just like Express
// app.use(errors.handler());

// Start the server
var port = process.env.PORT || 3030;
var server = app.listen(port);
server.on('listening', function() {
  console.log('Feathers Messages MongoDB service running on ' + port);
});
