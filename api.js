var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.post('/endpoints', wagner.invoke(function(Endpoint) {
    return function(req, res) {
      // placeholder
      return res.status(status.INTERNAL_SERVER_ERROR).
      json({error: 'this is a test'});
    }
  }));

  return api;
};
