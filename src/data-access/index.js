import makeScoresDb from './scores-db'
import makeTeamsDb from './teams-db'
import mongodb from 'mongodb'
import seedDb from './seeder'

const MongoClient = mongodb.MongoClient
const url = process.env.DB_URL
const dbName = process.env.DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(dbName)
}

async function clearDb (db) {
  await db.collection('scores').deleteMany({})
  await db.collection('teams').deleteMany({})
  return true
}

const scoresDb = makeScoresDb({ makeDb })
const teamsDb = makeTeamsDb({ makeDb })

const {
  ENVIRONMENT
} = process.env

if (ENVIRONMENT === 'development' || ENVIRONMENT === 'staging') {
  (async function () {
    const db = await makeDb()
    await clearDb(db)
    seedDb({ scoresDb, teamsDb, amount: 5 })
  })()
}

export {
  scoresDb,
  teamsDb
}
