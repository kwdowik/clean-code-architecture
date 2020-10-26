import makeFakeTeam from '../../../__test__/fixtures/team'
import makeTeam from './'

describe.only('team', () => {
  it('must have a name', () => {
    const team = makeFakeTeam({ name: null })
    expect(() => makeTeam(team)).toThrow('Team must have a name.')
  })
  it('team`s name must be longer than 3 characters', () => {
    const team = makeFakeTeam({ name: 'ad' })
    expect(() => makeTeam(team)).toThrow('Team`s name must be longer than 3 characters.')
  })
})
