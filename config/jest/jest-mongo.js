const NodeEnvironment = require('jest-environment-node')
const path = require('path')
const fs = require('fs')

const mongoConfigPath = path.join(__dirname, 'mongoConfig.json')

class MongoEnvironment extends NodeEnvironment {
  async setup () {
    const globalConfig = JSON.parse(fs.readFileSync(mongoConfigPath, 'utf-8'))

    this.global.__MONGO_URI__ = globalConfig.mongoUri
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName

    await super.setup()
  }

  async teardown () {
    await super.teardown()
  }

  runScript (script) {
    return super.runScript(script)
  }
}

module.exports = MongoEnvironment
