import faker from 'faker'
import cuid from 'cuid'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export default function makeFakeScore (overrides) {
  const score = {
    user: faker.name.findName(),
    createdOn: Date.now(),
    id: Id.makeId(),
    modifiedOn: Date.now(),
    categoryId: Id.makeId(),
    teamId: Id.makeId(),
    points: 0,
  }

  return {
    ...score,
    ...overrides
  }
}