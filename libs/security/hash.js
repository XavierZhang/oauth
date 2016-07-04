var crypto = require('crypto');

module.exports = (function() {
  return {
    encrypt: function(algorithm, txt, encoding) {
      var shasum = crypto.createHash(algorithm);
      shasum.update(txt);
      if (encoding) {
        return shasum.digest(encoding);
      }
      return shasum.digest('hex');
    }
  }
})();
