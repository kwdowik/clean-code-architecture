import makeDb, { closeDb, clearDb } from '../../__test__/fixtures/db'
import makeScoresDb from './scores-db'
import makeFakeScore from '../../__test__/fixtures/score'

describe('scores db', () => {
  let scoresDb

  beforeAll(async () => {
    await makeDb()
    await clearDb()
    scoresDb = makeScoresDb({ makeDb })
  })

  afterAll(async () => {
    await closeDb()
  })

  it('lists scores', async () => {
    const inserts = await Promise.all(
      [makeFakeScore(), makeFakeScore(), makeFakeScore()].map(
        scoresDb.insert
      )
    )
    const found = await scoresDb.findAll()
    expect(inserts.length).toBe(3)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('inserts a score', async () => {
    const score = makeFakeScore()
    const result = await scoresDb.insert(score)
    return expect(result).toEqual(score)
  })

  it('finds a score by id', async () => {
    const score = makeFakeScore()
    await scoresDb.insert(score)
    const found = await scoresDb.findById(score)
    expect(found).toEqual(score)
  })

  it("finds a score by it's hash", async () => {
    // expect.assertions(2)
    const fakeCommentOne = makeFakeScore()
    const fakeCommentTwo = makeFakeScore()
    const insertedOne = await scoresDb.insert(fakeCommentOne)
    const insertedTwo = await scoresDb.insert(fakeCommentTwo)

    expect(await scoresDb.findByHash(fakeCommentOne)).toEqual(insertedOne)
    expect(await scoresDb.findByHash(fakeCommentTwo)).toEqual(insertedTwo)
  })

  it('updates a score', async () => {
    const score = makeFakeScore()
    await scoresDb.insert(score)
    score.points = 100
    const updated = await scoresDb.update(score)
    return expect(updated.points).toBe(100)
  })

  it('finds all scores for a category', async () => {
    const scoreOnCategoryA = makeFakeScore()
    const scoreOnCategoryB = makeFakeScore()
    await Promise.all([scoreOnCategoryA, scoreOnCategoryB].map(scoresDb.insert))

    expect(
      (await scoresDb.findByCategoryId({
        categoryId: scoreOnCategoryA.categoryId
      }))[0]
    ).toEqual(scoreOnCategoryA)

    expect(
      (await scoresDb.findByCategoryId({
        categoryId: scoreOnCategoryB.categoryId
      }))[0]
    ).toEqual(scoreOnCategoryB)
  })

  it('finds all scores for a team', async () => {
    const scoreOnTeamA = makeFakeScore()
    const scoreOnTeamB = makeFakeScore()
    await Promise.all([scoreOnTeamA, scoreOnTeamB].map(scoresDb.insert))

    expect(
      (await scoresDb.findByTeamId({
        teamId: scoreOnTeamA.teamId
      }))[0]
    ).toEqual(scoreOnTeamA)

    expect(
      (await scoresDb.findByTeamId({
        teamId: scoreOnTeamB.teamId
      }))[0]
    ).toEqual(scoreOnTeamB)
  })

  it('deletes a score', async () => {
    const score = makeFakeScore()
    await scoresDb.insert(score)
    return expect(await scoresDb.remove(score)).toBe(1)
  })
})
