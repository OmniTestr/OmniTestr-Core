var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var randtoken = require('rand-token');
var dns = require('dns');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());
  api.use(bodyparser.urlencoded({ extended: true }));

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

  api.post('/dns', wagner.invoke(function(Token) {
    return function(req, res) {
      // grab the url,
      // resolve the dns
      // check if the token is unused
      // if unused, accept, else reject

      var cnameRecord = 'omnitestr.' + req.body.userDomain;
      console.log("testing the URI: " + cnameRecord);

      dns.resolveCname(cnameRecord, function(err, addresses) {
        if (!err && addresses) {
          var rawVal = addresses[0].split('.')[0];

          Token.findOne({token: rawVal, used: false}, function(error, doc) {
            if (error) {
              return res.redirect('/dashboard', {status: "error: invalid token"});
            } 

            if (doc) {
              console.log("found it");
              console.log(doc);

              doc.used = true;

              doc.save(function(err) {
                if (err) {
                  return res.status(status.INTERNAL_SERVER_ERROR).
                  json({error: 'unable to authenticate token'});
                }
              });

               // setup benchmark feature ready to go

            }
            



           
          });
        } else {
          res.status(status.NOT_FOUND).
          json({error: 'this is a test'});
          // redirect to the original
        }
  
      }
        

      );


      return res.status(status.OK).
      json({error: 'this is a test'});

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
