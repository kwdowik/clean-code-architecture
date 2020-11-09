import makeScore from '../entities/score'

export default function makeAddScore ({ scoresDb }) {
  return async function addScore (scoreInfo) {
    const score = makeScore(scoreInfo)
    const exists = await scoresDb.findByHash({ hash: score.getHash() })
    if (exists) {
      return exists
    }

    return scoresDb.insert({
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
};
