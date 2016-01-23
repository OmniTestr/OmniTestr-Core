var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  }
});

module.exports = schema;
