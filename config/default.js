const packageJson = require('../package.json')

module.exports = {
  debug: false,
  logger: {
    logLevel: 'info',
    logReqRes: false,
  },
  server: {
    port: process.env.PORT || 8080,
  },
  web: {
    name: packageJson.name,
    version: packageJson.version,
  },
  db: {
    uri: 'mongodb://localhost:27017/challenger_db',
  },
}
