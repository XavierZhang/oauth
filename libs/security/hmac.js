var crypto = require('crypto');

module.exports = (function() {
  return {
    encrypt: function(algorithm, key, txt, encoding) {
      var shasum = crypto.createHmac(algorithm, key);
      shasum.update(txt);
      if (encoding) {
        return shasum.digest(encoding);
      }
      return shasum.digest('hex');
    }
  }
})();
