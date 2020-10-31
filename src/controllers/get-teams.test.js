import makeGetTeams from './get-teams'
import makeFakeTeam from '../../__test__/fixtures/team'

describe('get teams controller', () => {
  it('successfully get a teams', async () => {
    const teamA = makeFakeTeam()
    const teamB = makeFakeTeam()
    const getTeams = makeGetTeams({ listTeams: () => [teamA, teamB] })
    const request = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: { teams: [teamA, teamB] }
    }

    const actual = await getTeams(request)
    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const getTeams = makeGetTeams({
      listTeams: () => {
        throw Error('Pow!')
      }
    })
    const fakeTeam = makeFakeTeam()
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: fakeTeam
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    }

    const actual = await getTeams(request)

    expect(actual).toEqual(expected)
  })
})
