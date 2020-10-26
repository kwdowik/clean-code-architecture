import faker from 'faker'
import Id from '../entities/id'
import makeScore from '../entities/score'

export const seedDb = async ({ scoresDb, amount }) => {
  const scores = await scoresDb.findAll()
  if (scores.length !== 0) {
    return
  }
  for (let i = 0; i <= amount; i++) {
    const score = makeScore({
      user: faker.name.findName(),
      id: Id.makeId(),
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      categoryId: i.toString(),
      teamId: i.toString(),
      points: i * 10
    })
    scoresDb.insert({
      user: score.getUser(),
      createdOn: score.getCreatedOn(),
      hash: score.getHash(),
      id: score.getId(),
      modifiedOn: score.getModifiedOn(),
      teamId: score.getTeamId(),
      categoryId: score.getCategoryId(),
      points: score.getPoints()
    })
  }
}
