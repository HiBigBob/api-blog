var user 			= require('../controllers/user');
var setup 			= require('../controllers/setup');
var authenticate 	= require('../controllers/auth');
var post 			= require('../controllers/post');
var tag 			= require('../controllers/tag');

var auth 			= require('../middlewares/auth');
var require 		= require('../middlewares/require');

module.exports.set = function(app) {
	app.use('/authenticate', authenticate);
	app.use('/setup', setup);
  	app.use('/users', [auth, require], user);
  	app.use('/posts', post);
  	app.use('/tags', tag);
}
