var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var randtoken = require('rand-token');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.get('/', function(req, res) {
      res.render('main.jade', {});
  });




  // api.get('/dashboard', );
      
        
        
         

  return api;
};
