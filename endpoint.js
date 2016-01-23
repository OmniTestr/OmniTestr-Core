var mongoose = require('mongoose');
var status = require('status.js');
/* Fields that must be in the schema:
 *  uri:          a string representing the URI of the API endpoint, such as "v1/:userid/create".
 *                Required.
 *  method:       a string representing the HTTP method, such as "GET". Required.
 *  sources:      an array of uris, identifying the originating URIs. Required.
 *  time:         an array of integers, representing the frequency of the response time in bins. Required.
 *  statuses:     an array of statuses, encoding the type and the frequency
 */

var schema = new mongoose.Schema({
  uri: {
    type: String,
    required: true
    // 'v1/:userid/create'
  },
  method: {
    type: String,
    required: true
    // 'GET'
  }
  sources: [{
    type: String,
    required: true
    // ['https://news.ycombinator.com', 'https://news.ycombinator.com/comments']
  }],
  time: [{
    type: Number,
    limit: 10000
    // [1,0,0,...,200, 250,340,200,...0]
  }],
  statuses: [{
    type: status
    // [{'404', 350}, {'500'. 100}]
  }]
});

module.exports = schema;
