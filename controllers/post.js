var express     = require('express');
var router      = express.Router();
var Post        = require('../models/post');
var auth        = require('../middlewares/auth');
var require     = require('../middlewares/require');

router.param("post_id", function (req, res, next, value) {
  Post.findOne({ _id: value}, function(err, post) {
    if (err) { res.status(403); }
    req.post = post;
    next();
  })
});

router.get('/', function(req, res, next){
  Post
    .find({}, function (err, posts) {
      if (err) return next(new Error(err));
      res.json(posts);
    }
  );
});

router.get('/:post_id', function(req, res){
    res.json(req.post);
});

router.post('/', auth, require, function(req, res, next){
  if (!req.body.title && !req.body.content) return next(new Error('No data provided.'));

  var post = new Post({
    userId: req.user._id,
    title: req.body.title,
    content: req.body.content,
  });

  post.save(function(err) {
    if (err) console.log(err);
    console.log('Post saved successfully');
  });

  res.status(200).json(post);
});

router.put('/:post_id', auth, require, function(req, res, next) {
  if (!req.body.title && !req.body.content && !req.body.tags) return next(new Error('Param is missing.'));
  Post.update({_id: req.post._id}, {$set: {title: req.body.title, content: req.body.content, tags: req.body.tags}}, function(error, count) {
    if (error) return next(error);
    console.info('Updated post %s.', req.post._id);

    Post.findOne({ _id: req.post._id}, function(err, post) {
      res.status(200).json(post);
    });
  });
});

router.delete('/:post_id', auth, require, function(req, res, next) {
  Post.remove({_id: req.post._id}, function(error, count) {
    if (error) return next(error);
    console.info('Deleted post %s.', req.post._id);
    res.status(204).send();
  });
});

module.exports = router;
