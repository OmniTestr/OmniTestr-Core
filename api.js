var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var randtoken = require('rand-token');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());


  // TODO
  // handle token
  //    GET
  //    POST
  // verify dns records
  // reboot the linode instances
  // estalish web socket connection and broadcast distributed workload to slaves
  // aggregate the benchmark result real-time and stream it back to the view to
  //    modify the svg elements
  // 




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

  api.post('/token/:id/:host', wagner.invoke(function(Token) {
    return function(req, res) {
      Token.findOne({token: req.params.id, used: false}, function(error, doc) {
        if (error) {
          return res.status(status.INTERNAL_SERVER_ERROR).
          json({error: 'unable to authenticate token'});
        }
        if (!doc) {
          return res.
            status(status.NOT_FOUND).
            json({error: 'not found'});
        } else {
          doc.used = true;



          doc.save(function(err) {
            if (err) {
              return res.status(status.INTERNAL_SERVER_ERROR).
              json({error: 'unable to authenticate token'});
            } else {
              return res.status(status.OK).json({status:"success"});
            }
          });
        }
      });

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
