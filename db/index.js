import { makeDb } from '../src/data-access'
import dotenv from 'dotenv'
dotenv.config()
;(async function setupDb () {
  console.log('Setting up database...')
  const db = await makeDb()
  const result = await db
    .collection('scores')
    .createIndexes([
      { key: { hash: 1 }, name: 'hash_idx' },
      { key: { categoryId: -1 }, name: 'categoryId_idx' },
      { key: { teamId: -1 }, name: 'teamId_idx' }
    ])
  console.log(result)
  console.log('Database setup complete...')
  process.exit()
})()
