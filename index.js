const express = require('express');
const app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var methodOverride = require('method-override');



var router=require('./routes/index');


var port=3003;
/*
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogs");
*/

/*mongoose.Promise = Promise;*/

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var indexRouter = require('./routes/index');
app.set('view engine', 'ejs');
app.set(express.static(__dirname+'views'));
app.use(express.static(__dirname+'/public'));

app.use(methodOverride('_method'));


app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);

app.listen(port, () => {
    console.log("Server listening on port " + port);
});





