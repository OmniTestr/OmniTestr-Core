var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var dns = require('dns');
var randtoken = require('rand-token');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.get('/token', wagner.invoke(function(Token) {
    return function(req, res) {
      var token = randtoken.generate(16);
      Token.create({token: token, used: false}, function(error, doc) {
        if (error) {
          return res.status(status.INTERNAL_SERVER_ERROR).
          json({error: 'unable to generate token'});
        }
      });

      return res.status(status.OK).
      json({token: token});
    }
  }));

  api.post('/token/:id', wagner.invoke(function(Token) {
    return function(req, res) {
      Token.update({token: req.params.id, used: false}, {$set: {used: true}}, function(error, doc) {
        if (error) {
          return res.status(status.INTERNAL_SERVER_ERROR).
          json({error: 'unable to authenticate token'});
        }
        if (!doc) {
          return res.
            status(status.NOT_FOUND).
            json({error: 'not found'});
        }
      });

      // placeholder
      return res.status(status.OK).
      json({token: token});
    }
  }));

  // generates token
  api.get('/endpoints', wagner.invoke(function(Endpoint) {
    return function(req, res) {
      // placeholder
      return res.status(status.OK).
      json({error: 'this is a test'});
    }
  }));

  return api;
};
