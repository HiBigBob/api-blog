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

  var taskDo = new Post({
    userId: john._id,
    title: 'Call john',
    content: 'To fix a meeting',
  });

  var taskDo2 = new Post({
    userId: john._id,
    title: 'Learn EmberJs',
    content: 'To add it in my skill'
  });

  var taskBuy = new Post({
    userId: john._id,
    title: 'FullMetal Alchimist',
    content: 'To pass a good time'
  });

  var taskBuy2 = new Post({
    userId: john._id,
    title: 'Vinland Saga',
    content: 'To begin this serie'
  });

  // save the first user
  john.save(function(err) {
    if (err) console.log(err);
    console.log('User saved successfully');
  });

  taskDo.save(function(err) {
    if (err) console.log(err);
    console.log('PostDo saved successfully');
  });

  taskDo2.save(function(err) {
    if (err) console.log(err);
    console.log('PostDo2 saved successfully');
  });

  taskBuy.save(function(err) {
    if (err) console.log(err);
    console.log('PostBuy saved successfully');
  });

  // save the first task
  taskBuy2.save(function(err) {
    if (err) console.log(err);
    console.log('PostBuy2 saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
