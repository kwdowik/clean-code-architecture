import makeListScores from './list-scores'
import makeScoresDb from '../data-access/scores-db'
import makeFakeScore from '../../__test__/fixtures/score'
import makeDb from '../../__test__/fixtures/db'

describe.skip('list scores', () => {
  let scoresDb
  beforeAll(() => {
    scoresDb = makeScoresDb({ makeDb })
  })

  it('find all scores from the database', async () => {
    const newScore1 = makeFakeScore();
    const newScore2 = makeFakeScore();
    scoresDb.insert(newScore1);
    scoresDb.insert(newScore2);
    const listScores = makeListScores({
      scoresDb: scoresDb,
    })
    expect(await listScores()).toMatchObject([newScore1, newScore2])
  })
})
