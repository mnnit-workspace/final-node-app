"use strict"

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var crypto = require("crypto");
var passport = require('passport');

var config = require("../config/ouch.js");

var UserExport = require("./models/user.js");
var User = UserExport.model;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', {
    title : "iChatYou Home",
    user  :  useremail(req)
  });
});

router.get('/login', function(req, res, next) {
  res.render('login.html', {
    title: 'Login',
    user : useremail(req)
  });
});

router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/signup', function(req, res, next) {
  res.render('signup.html', {
    title: 'Signup',
    user: useremail(req)
  });
});

router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));
module.exports = router;


function useremail(req){
  if(!req.user){
    return false;
  } else {
    return req.user.local.email;
  }
}
