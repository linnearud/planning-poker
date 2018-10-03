var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9_]+$/, 'is invalid'], index: true},
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

var UserModel = mongoose.model('User', UserSchema, 'users');
module.exports = UserModel