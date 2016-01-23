var dns = require('dns');

module.exports = function(host, callback) {
  dns.resolveCname(host, function(err, addresses) {
    if (callback) {
      callback(addresses[0]);
    }
  });
}
