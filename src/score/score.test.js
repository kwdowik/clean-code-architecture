import makeFakeScore from '../../__test__/fixtures/score'
import makeScore from './'

describe('score', () => {
  it('must have a user', () => {
    const score = makeFakeScore({ user: null })
    expect(() => makeScore(score)).toThrow('Score must have a user.')
  })
  it('user`s name must be longer than 3 characters', () => {
    const score = makeFakeScore({ user: 'ad' })
    expect(() => makeScore(score)).toThrow('Score user`s name must be longer than 3 characters.')
  })
  it('must contain a categoryId', () => {
    const score = makeFakeScore({ categoryId: null })
    expect(() => makeScore(score)).toThrow('Score must contain a categoryId.')
  })
  it('must contain a teamId', () => {
    const score = makeFakeScore({ teamId: null })
    expect(() => makeScore(score)).toThrow('Score must contain a teamId.')
  })
  it('should has points set to 0 by default', () => {
    const score = makeFakeScore()
    expect(makeScore(score).getPoints()).toBe(0)
  })
  it('can increase points', () => {
    const fakeScore = makeFakeScore()
    const score = makeScore(fakeScore)
    score.setPoints(10)
    expect(score.getPoints()).toBe(10)
  })
  it('can decrease points', () => {
    const fakeScore = makeFakeScore()
    const score = makeScore(fakeScore)
    score.setPoints(10)
    score.setPoints(-5)
    expect(score.getPoints()).toBe(5)
  })
  it('cannot decrease points below 0', () => {
    const fakeScore = makeFakeScore()
    const score = makeScore(fakeScore)
    score.setPoints(-5)
    expect(score.getPoints()).toBe(0)
  })
})
