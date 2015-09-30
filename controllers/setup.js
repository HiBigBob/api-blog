var express = require('express');
var router = express.Router();
var User   = require('../models/user');
var Post   = require('../models/post');

router.get('/', function(req, res, next) {
  // create the first user
  var john = new User({
    username: 'John',
    password: 'password'
  });

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 7);

  var post1 = new Post({
    userId: john._id,
    title: 'Call john',
    content: 'To fix a meeting',
  });

  var post2 = new Post({
    userId: john._id,
    title: 'Learn EmberJs',
    content: 'To add it in my skill'
  });

  var post3 = new Post({
    userId: john._id,
    title: 'FullMetal Alchimist',
    content: 'To pass a good time'
  });

  // save the first user
  john.save(function(err) {
    if (err) console.log(err);
    console.log('User saved successfully');
  });

  post1.save(function(err) {
    if (err) console.log(err);
    console.log('Post1 saved successfully');
  });

  post2.save(function(err) {
    if (err) console.log(err);
    console.log('Post2 saved successfully');
  });

  post3.save(function(err) {
    if (err) console.log(err);
    console.log('Post3 saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
