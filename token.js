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
    // "404"
  },
  used: {
    type: Boolean,
    required: true
    // 42
  }
};

module.exports = new mongoose.Schema(tokenSchema);
module.exports.tokenSchema = tokenSchema;
