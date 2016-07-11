var config = require('./config');

if (config.seedDB) {
  require('./libs/seed-sql');
}
if (config.seedMongoDB) {
  require('./libs/seed');
}
