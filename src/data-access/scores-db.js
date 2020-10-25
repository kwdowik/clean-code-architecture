import Id from '../Id'

const COLLECTION_NAME = 'scores'

export default function makeScoresDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    findByHash,
    findById,
    findByCategoryId,
    findByTeamId,
    insert,
    remove,
    update
  })
  async function findAll () {
    const db = await makeDb()
    const query = {}
    const result = await db.collection(COLLECTION_NAME).find(query)
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(COLLECTION_NAME).find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }
  async function findByTeamId ({ teamId }) {
    const db = await makeDb()
    const query = { teamId: teamId }
   
    const result = await db.collection(COLLECTION_NAME).find(query)
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function findByCategoryId ({ categoryId }) {
    const db = await makeDb()
    const query = { categoryId: categoryId }
   
    const result = await db.collection(COLLECTION_NAME).find(query)
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function insert ({ id: _id = Id.makeId(), ...scoreInfo }) {
    const db = await makeDb()
    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne({ _id, ...scoreInfo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function update ({ id: _id, ...scoreInfo }) {
    const db = await makeDb()
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id }, { $set: { ...scoreInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...scoreInfo } : null
  }
  async function remove ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(COLLECTION_NAME).deleteOne({ _id })
    return result.deletedCount
  }
  async function findByHash (score) {
    const db = await makeDb()
    const result = await db.collection(COLLECTION_NAME).find({ hash: score.hash })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...insertedInfo } = found[0]
    return { id, ...insertedInfo }
  }
}
