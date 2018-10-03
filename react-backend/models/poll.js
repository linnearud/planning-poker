var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var nanoid = require('nanoid')

var PollSchema = new mongoose.Schema({
  pollname: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
  code: {type: String, unique: true},
  description: String,
  options: [Number],
  user: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

PollSchema.pre('save', function(next) {
	this.code = nanoid(5);
	next();
})

PollSchema.plugin(uniqueValidator, {message: 'is already taken.'});

var PollModel = mongoose.model('Poll', PollSchema, 'polls');
module.exports = PollModel;