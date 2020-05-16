import {
  addScore,
  listScores
} from '../use-cases'
import makePostScore from './post-score'
import makeGetScores from './get-scores'
import notFound from './not-found'

const postScore = makePostScore({ addScore })
const getScores = makeGetScores({ listScores })

const scoreController = Object.freeze({
  notFound,
  getScores,
  postScore
})

export default scoreController
export { notFound, postScore, getScores }
