import makeListScores from './list-scores'
import makeScoresDb from '../data-access/scores-db'
import makeFakeScore from '../../__test__/fixtures/score'
import makeDb, { clearDb } from '../../__test__/fixtures/db'

describe('list scores', () => {
  let scoresDb
  beforeAll(async () => {
    await makeDb()
    await clearDb()
    scoresDb = makeScoresDb({ makeDb })
  })

  it('find all scores from the database', async () => {
    const newScore1 = makeFakeScore()
    const newScore2 = makeFakeScore()
    await scoresDb.insert(newScore1)
    await scoresDb.insert(newScore2)
    const listScores = makeListScores({
      scoresDb: scoresDb
    })
    const scores = await listScores()
    expect(scores.length).toBe(2)
    expect(scores).toEqual([newScore1, newScore2])
  })
})
