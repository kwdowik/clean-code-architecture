import makeDb, { clearDb } from '../../__test__/fixtures/db'
import makeTeamsDb from '../data-access/teams-db'
import makeFakeTeam from '../../__test__/fixtures/team'
import makeListScores from './list-teams'

describe('list teams', () => {
  let teamsDb
  beforeAll(async () => {
    await makeDb()
    await clearDb()
    teamsDb = makeTeamsDb({ makeDb })
  })

  it('find all teams from database', async () => {
    const teamA = makeFakeTeam()
    const teamB = makeFakeTeam()
    Promise.all([teamA, teamB].map(teamsDb.insert))

    const listScores = makeListScores({ teamsDb: teamsDb })
    const teams = await listScores()

    expect(teams.length).toBe(2)
    expect(teams).toEqual([teamA, teamB])
  })
})
