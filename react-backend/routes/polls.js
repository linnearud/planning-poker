var express = require('express');
var router = express.Router();
var pollModel = require('../models/poll');

/* GET polls listing. */
router.get('/', function(req, res, next) {
  pollModel.find().lean().exec(function (err, polls) {
    return res.json(polls);
  });
});

/* GET single poll */
router.get('/:code', function(req, res, next) {
  pollModel.findOne({code: req.params.code}, function (err, poll) {
    return res.json(poll)
  }); 
});

/* POST new poll */
router.post('/', function(req, res, next) {
  pollModel.create({ 
    pollname: req.body.pollname, 
    description: req.body.description, 
    options: req.body.options,
    user: req.body.user
  }, function (err, poll) {
    if (err) {
      next(err)
    } else {
      return res.json(poll)
    }
  });
});

module.exports = router;