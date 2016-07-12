var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  username: {type: String, required: true},
  text: {type: String, required: true},
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
});

MessageSchema.index({'createdAt': -1, background: true});

var MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
