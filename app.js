var express 	= require('express');
var path 		= require('path');
var logger 		= require('morgan');
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var config 		= require('./config/config');

var app = express();

var port = process.env.PORT || 4000;

app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connected !");
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

var routing = require('./config/routing')
routing.set(app);

app.listen(port);

module.exports = app;
