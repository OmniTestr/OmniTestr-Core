var mongoose = require('mongoose');
var _ = require('underscore');
var socket = require('./index');


module.exports = function(wagner) {
  // use test database
  mongoose.connect('mongodb://localhost:27017/test');

  wagner.factory('db', function() {
    return mongoose;
  });

  wagner.factory('Socket', function() {
    return socket;
  });

  // wagner.factory('wss', function() {
  //   return wss;
  // });

  // Endpoints are stored in the endpoints collection
  var Endpoint =
    mongoose.model('Endpoint', require('./endpoint'), 'endpoints');
  var Status =
    mongoose.model('Status', require('./status'));
  var Token =
    mongoose.model('Token', require('./token'), 'tokens');
  var User =
    mongoose.model('User', require('./user'), 'users');

  var models = {
    Endpoint: Endpoint,
    Status: Status,
    Token: Token,
    User: User
  };

  // register factories
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
