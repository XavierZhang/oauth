var crypto = require('crypto');

module.exports = (function() {
  return {
    encrypt: function(algorithm, key, txt, encoding) {
      var shasum = crypto.createHmac(algorithm, key);
      var encrypted = shasum.update(txt, "utf8", encoding ? encoding : "hex");
      encrypted += shasum.digest(encoding ? encoding : "hex");
      return encrypted;
    },
    decrypt: function(algorithm, key, txt, encoding) {
      var shasum = crypto.createHmac(algorithm, key);
      var decrypted = shasum.update(txt, encoding ? encoding : "hex", "utf8");
      decrypted += shasum.digest("utf8");
      return decrypted;
    }
  }
})();
