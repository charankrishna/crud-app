var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogs");

mongoose.Promise = Promise;
module.exports.Post=require('./posts');
module.exports.User=require('./User')