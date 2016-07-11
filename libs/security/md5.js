var crypto = require('crypto');
var md5 = crypto.createHash('md5');

module.exports = (function() {
  return {
    encrypt: function(txt, salt, encoding) {
      var shasum = crypto.createHash("md5");
      shasum.update(txt + salt);
      if (encoding) {
        return shasum.digest(encoding);
      }
      return shasum.digest('hex');
    }
  }
})();
