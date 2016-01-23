var mongoose = require('mongoose');
/* Fields that must be in the schema:
 *  code:         a string representing the HTTP status code, such as "404".
 *                Required.
 *  frequency:    an integer representing the frequency of the occurence of a
                  particular status code. Required.
 */

var statusSchema = {
  code: {
    type: String,
    required: true
    // "404"
  },
  frequency: {
    type: Number,
    required: true
    // 42
  }
};

module.exports = new mongoose.Schema(statusSchema);
module.exports.statusSchema = statusSchema;
