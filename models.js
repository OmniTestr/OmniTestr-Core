var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  // use test database
  mongoose.connect('mongodb://localhost:27017/test');

  wagner.factory('db', function() {
    return mongoose;
  });

  // Endpoints are stored in the endpoints collection
  var Endpoint =
    mongoose.model('Endpoint', require('./endpoint'), 'endpoints');
  var Status =
    mongoose.model('Status', require('./status'));

  var models = {
    Endpoint: Endpoint,
    Status: Status
  };

  // register factories
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
