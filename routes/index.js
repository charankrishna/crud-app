var bodyParser = require("body-parser");
const express=require('express');
var router=express.Router();
var db= require('../models/index');
var post = db.Post;
var methodOverride = require('method-override');
var auth = require("../controllers/AuthController.js");




router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended:true}));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

router.get('/Writepost',function (req,res) {
    res.render('Writepost');
});


router.get('/',function (req,res) {
    res.render('index');
});

router.get('/readpost',function (req,res) {
    post.find(function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('readpost', {newPost : data});
        }
    });


    });

router.post('/readpost',function (req,res) {
    console.log(req.body);
    var newPost =new post({
        topic : req.body.topic,
        description : req.body.description,
        author: req.body.author
    });
    newPost.save(function(err, data){
        if(err){
            console.log(err);
        }else{
            console.log(data);

           res.redirect('/readpost');
        }
    });

});


router.get('/:id',function (req,res) {
    var id = req.params.id;
    console.log(id);
    db.Post.findById(id)
        .then(function(newPost){
            res.render('ud',{newPost: newPost});
        })
        .catch(function(err){
            res.send(err)
        })
});


// update field




router.get('/:id/editblogs',function (req,res) {
    var id = req.params.id;
    console.log(id);
    db.Post.findById(id)
        .then(function(newPost){
            res.render('editblogs',{newPost: newPost});
            /*res.json(newPost)*/
        })
        .catch(function(err){
            res.send(err)
        })
});

router.put('/update/:id' ,function(req,res){

    db.Post.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(function(newPost){
            res.redirect('/readpost');
        })
        .catch(function(err){
            res.send(err)
        })

});

//delete post

router.delete('/:id/delete', function(req,res){
    db.Post.remove({_id : req.params.id})
        .then(function(){
            res.redirect('/readpost');
        })
        .catch(function(err){
            res.send(err)
        })

});



// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

module.exports = router;
