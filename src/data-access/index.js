import makeScoresDb from './scores-db'
import mongodb from 'mongodb'

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

const scoresDb = makeScoresDb({ makeDb })
export default scoresDb
