import faker from 'faker'
import cuid from 'cuid'
import crypto from 'crypto'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

export default function makeFakeScore (overrides) {
  const score = {
    user: faker.name.findName(),
    createdOn: Date.now(),
    id: Id.makeId(),
    modifiedOn: Date.now(),
    categoryId: Id.makeId(),
    teamId: Id.makeId(),
    points: 0
  }

  score.hash = md5(
    (score.user || '') +
    (score.teamId || '') +
    (score.categoryId || '')
  )

  return {
    ...score,
    ...overrides
  }
}
