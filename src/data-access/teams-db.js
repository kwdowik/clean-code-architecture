import Id from '../entities/id'

const COLLECTION_NAME = 'teams'

export default function makeTeamsDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    insert
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

  async function insert ({ id: _id = Id.makeId(), ...teamInfo }) {
    const db = await makeDb()
    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne({ _id, ...teamInfo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db
      .collection(COLLECTION_NAME)
      .find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }
}
