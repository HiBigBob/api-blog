var user = require('../controllers/user');
var setup = require('../controllers/setup');
var auth = require('../controllers/auth');
var post = require('../controllers/post');

var jwtAuth = require('../lib/auth');
var requireAuth = require('../lib/require');

module.exports.set = function(app) {
	app.use('/authenticate', auth);
	app.use('/setup', setup);
  app.use('/users', [jwtAuth, requireAuth], user);
  app.use('/posts', post);
}
