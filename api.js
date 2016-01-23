var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var dns = require('dns');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());


  api.get('/endpoints', wagner.invoke(function(Endpoint) {
    return function(req, res) {
      // placeholder
      return res.status(status.OK).
      json({error: 'this is a test'});
    }
  }));

  return api;
};
