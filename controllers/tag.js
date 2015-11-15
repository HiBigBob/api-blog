var express     = require('express');
var router      = express.Router();
var Tag         = require('../models/tag');
var auth        = require('../middlewares/auth');
var required    = require('../middlewares/require');

router.param("tag_id", function (req, res, next, value) {
  Tag.findOne({ _id: value}, function(err, tag) {
    if (err) { res.status(403); }
    req.tag = tag;
    next();
  })
});

router.get('/', function(req, res, next){
  Tag.find({}, function(err, tags) {
    res.json(tags);
  })
});

router.get('/:tag_id', function(req, res){
    res.json(req.tag);
});

router.post('/', auth, required, function(req, res, next){
  if (!req.body.title) return next(new Error('No data provided.'));

  var tag = new Tag({
    title: req.body.title
  });

  tag.save(function(err) {
    if (err) console.log(err);
    console.log('Tag saved successfully');
  });

  res.status(200).json(tag);
});

router.put('/:tag_id', auth, required, function(req, res, next) {
  if (!req.body.title) return next(new Error('Param is missing.'));
  Tag.update({_id: req.tag._id}, {$set: {title: req.body.title}}, function(error, count) {
    if (error) return next(error);
    console.info('Updated tag %s.', req.tag._id);
    res.status(200).send();
  })
});

router.delete('/:tag_id', auth, required, function(req, res, next) {
  Tag.removeById(req.tag._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted tag %s.', req.tag._id);
    res.status(204).send();
  });
});

module.exports = router;
