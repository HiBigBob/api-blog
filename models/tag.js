var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Tag', new Schema({
    title: String
}));
