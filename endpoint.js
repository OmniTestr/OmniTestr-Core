var mongoose = require('mongoose');
var status = require('./status');
/* Fields that must be in the schema:
 *  uri:          a string representing the URI of the API endpoint, such as "v1/:userid/create".
 *                Required.
 *  content:      a string representing the content-type, such as "text/javascript".
 *  method:       a string representing the HTTP method, such as "GET". Required.
 *  sources:      an array of uris, identifying the originating URIs. Required.
 *  frequecies:         an array of integers, representing the frequency of the response time in bins. Required.
 *  statuses:     an array of statuses, encoding the type and the frequency
 */

var endpointSchema = {
  uri: {
    type: String,
    required: true
    // 'v1/:userid/create'
  },
  content: {
    type: String,
    required: true
    // "text/css"
  },
  method: {
    type: String,
    uppercase: true,
    required: true
    // 'GET'
  },
  sources: [{
    type: String,
    required: true
    // ['https://news.ycombinator.com', 'https://news.ycombinator.com/comments']
  }],
  frequencies: [{
    type: Number,
    limit: 10000
    // [1,0,0,...,200, 250,340,200,...0]
  }],
  statuses: [
    status.statusSchema
    // [{'404', 350}, {'500'. 100}]
  ]
};

module.exports = new mongoose.Schema(endpointSchema);
module.exports.endpointSchema = endpointSchema;
