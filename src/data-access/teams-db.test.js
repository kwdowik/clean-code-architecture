import makeDb, { closeDb, clearDb } from '../../__test__/fixtures/db'
import makeTeamsDb from './teams-db'
import makeFakeTeam from '../../__test__/fixtures/team'

describe('teams db', () => {
  let teamsDb

  beforeAll(async () => {
    await makeDb()
    await clearDb()
    teamsDb = makeTeamsDb({ makeDb })
  })

  afterAll(async () => {
    await closeDb()
  })

  it('lists teams', async () => {
    const inserts = await Promise.all(
      [makeFakeTeam(), makeFakeTeam(), makeFakeTeam()].map(
        teamsDb.insert
      )
    )
    const foundTeams = await teamsDb.findAll()
    expect(inserts.length).toBe(3)
    return inserts.forEach(insert => expect(foundTeams).toContainEqual(insert))
  })

  it('inserts a team', async () => {
    const team = makeFakeTeam()
    const result = await teamsDb.insert(team)
    return expect(result).toEqual(team)
  })

  it('finds a team by id', async () => {
    const team = makeFakeTeam()
    await teamsDb.insert(team)
    const found = await teamsDb.findById(team)
    expect(found).toEqual(team)
  })
})
