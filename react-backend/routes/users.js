var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/* GET single user*/
router.get('/:username', function(req, res, next) {
  userModel.findOne({username: req.params.username}, function (err, user) {
    return res.json(user)
  }); 
});

/* POST new user */
router.post('/', function(req, res, next) {
  userModel.create({ 
    username: req.body.username,
  }, function (err, user) {
    if (err) {
      next(err)
    } else {
      return res.json(user)
    }
  });
});

module.exports = router;