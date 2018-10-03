var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
  poll: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  option: Number,
}, {timestamps: true});

VoteSchema.plugin(require('mongoose-create-or-update'));

var VoteModel = mongoose.model('Vote', VoteSchema, 'votes');
module.exports = VoteModel;