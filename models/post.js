var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema({
    userId: String,
    title: String,
    content: String,
    createTime: { type: Date, default: Date.now },
    tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}));
