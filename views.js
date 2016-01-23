var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var randtoken = require('rand-token');


module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.get('/', wagner.invoke(function(Token) {

    return function(req, res) {
      var token = randtoken.generate(16);

      Token.create({token: token, used: false}, function(error, doc) {
        if (error) {
          console.log("error");
          return res.status(status.INTERNAL_SERVER_ERROR).
          json({error: 'unable to generate token'});
        } else {
          console.log(token);
          return res.render('main.jade', {token: token});
        }
      });

    }
  }));


  return api;
};
