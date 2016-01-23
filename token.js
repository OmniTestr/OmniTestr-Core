var mongoose = require('mongoose');
/* Fields that must be in the schema:
 *  token:        a string representing the token
 *                Required.
 *  used:         a boolean representing the usage of the token. Required.
 */

var tokenSchema = {
  token: {
    type: String,
    required: true
    // "akdskjdilw21Lk"
  },
  used: {
    type: Boolean,
    default: false,
    required: true
    // true
  }
};

module.exports = new mongoose.Schema(tokenSchema);
module.exports.tokenSchema = tokenSchema;
