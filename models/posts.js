var mongoose=require('mongoose');


var nameSchema = new mongoose.Schema({
    topic: String,
    createdAt: {type: Date, default: Date.now},
    description:String,
    author:String
});

var Post = mongoose.model("Post", nameSchema);
module.exports= Post;