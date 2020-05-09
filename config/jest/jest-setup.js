const path = require('path')
const fs = require('fs')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongoConfigPath = path.join(__dirname, 'mongoConfig.json')

const mongod =
  global.__MONGOD__ ||
  new MongoMemoryServer({
    autoStart: false
  })

module.exports = async () => {
  if (!mongod.runningInstance) {
    await mongod.start()
  }

  const mongoConfig = {
    mongoDBName: 'test-db',
    mongoUri: await mongod.getConnectionString()
  }

  fs.writeFileSync(mongoConfigPath, JSON.stringify(mongoConfig))
  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod
}