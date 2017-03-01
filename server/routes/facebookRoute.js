var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var UserController = require('../controllers/userCtrl.js');

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/auth/facebook/callback',
       passport.authenticate('facebook', {
           successRedirect : '/',
           failureRedirect : '/'
       }));

module.exports = router;
