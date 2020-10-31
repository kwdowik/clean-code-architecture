import {
  addScore,
  listScores,
  listTeams
} from '../use-cases'
import makePostScore from './post-score'
import makeGetScores from './get-scores'
import makeGetTeams from './get-teams'
import notFound from './not-found'

const postScore = makePostScore({ addScore })
const getScores = makeGetScores({ listScores })
const getTeams = makeGetTeams({ listTeams })

const scoreController = Object.freeze({
  notFound,
  getScores,
  postScore,
  getTeams
})

export default scoreController
export { notFound, postScore, getScores, getTeams }
