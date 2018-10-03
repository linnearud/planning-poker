var express = require('express');
var router = express.Router();
var voteModel = require('../models/vote');

/* GET votes listing */
router.get('/', function(req, res, next) {
  voteModel.find().lean().exec(function (err, votes) {
    return res.json(votes);
  });
});

/* GET votes for one poll. */
router.get('/:poll_id', function(req, res, next) {
  voteModel.find({poll: req.params.poll_id}).lean().exec(function (err, votes) {
    return res.json(votes);
  });
});

/* GET vote for one poll and one user */
router.get('/:poll_id/:user_id', function(req, res, next) {
  console.log(req.params)
  voteModel.findOne({poll: req.params.poll_id, user: req.params.user_id}, function (err, vote) {
    return res.json(vote);
  });
});

/* PUT a new vote for a user and a poll */
router.put('/', function(req, res, next) {
  voteModel.findOne({poll: req.body.poll_id, user: req.body.user_id}, function (err, vote) {
    if (vote) {
      vote.option = req.body.option;
      vote.save()
      return res.json(vote)
    } else {
      voteModel.create({poll: req.body.poll_id, user: req.body.user_id, option: req.body.option}, function (err, vote) {
        return res.json(vote)
      }); 
    }
  })

  req.app.io.sockets.emit('vote_changed', {poll_id: req.body.poll_id})
});

module.exports = router;