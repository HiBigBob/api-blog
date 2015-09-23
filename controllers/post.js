var express = require('express');
var router = express.Router();
var Post   = require('../models/post');
var jwtAuth = require('../lib/auth');
var requireAuth = require('../lib/require');

router.param("post_id", function (req, res, next, value) {
  Post.findOne({ _id: value}, function(err, post) {
    req.post = post;
    next();
  })
});

router.get('/', function(req, res, next){
  Post.find({}, function(err, posts) {
    res.json(posts);
  })
});

router.post('/', jwtAuth, requireAuth, function(req, res, next){
  if (!req.body || !req.body.name || !req.body.categoryId) return next(new Error('No data provided.'));

  var post = new Post({
    categoryId: req.body.categoryId,
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    deadLineTime: req.body.date ? req.body.date : new Date(),
    completed: false
  });

  post.save(function(err) {
    if (err) console.log(err);
    console.log('Post saved successfully');
  });

  res.status(200).json(post);
});

router.put('/:post_id', jwtAuth, requireAuth, function(req, res, next) {
  if (!req.body.completed) return next(new Error('Param is missing.'));
  var completed = req.body.completed === 'true';
  Post.update({_id:req.post._id}, {$set: {completeTime: completed ? new Date() : null, completed: completed}}, function(error, count) {
    if (error) return next(error);
    console.info('Marked post %s with id=%s completed.', req.post.name, req.post._id);
    res.status(200).json({success: "ok"});
  })
});

router.delete('/:post_id', jwtAuth, requireAuth, function(req, res, next) {
  Post.removeById(req.post._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted post %s with id=%s completed.', req.post.name, req.post._id);
    res.status(204).send();
  });
});

module.exports = router;
