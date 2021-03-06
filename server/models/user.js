// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Wunderlist = require('../lib/wunderlist')
var Account = require('./account')
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String,
  wunderlistConnected: Boolean,
  facebookConnected: Boolean
});

User.plugin(passportLocalMongoose);

User.statics.connectWunderlistAccount = function(code, user, callback){
  console.log(user);
  UserMod = this;
  Wunderlist.fetchToken(code, function(err, token){
    if(err){
      callback(err);
    } else {
      Account.findOneAndUpdate({userid: user._id, type: 'Wunderlist'}, {accessToken: token}, {upsert: true, new: true}, function(err, account){
        if(err){
          console.log(err)
        } else {
          UserMod.update({id: account.user_id},{wunderlistConnected: true}, {}, function(err, user){
            if(err){
              console.log(err)
            } else {
             console.log('Wunderlist connected...!!!')
             callback(null, user);
            }
          })
        }
      })
    }
  });
}

module.exports = mongoose.model('users', User);
