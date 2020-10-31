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

export default function makeFakeTeam (overrides) {
  const team = {
    name: faker.name.findName(),
    createdOn: Date.now(),
    id: Id.makeId(),
    modifiedOn: Date.now()
  }

  team.hash = md5(team.name || '')

  return {
    ...team,
    ...overrides
  }
}
