import {
  addScore,
} from '../use-cases'
import makePostScore from './post-score'
import notFound from './not-found'

const postScore = makePostScore({ addScore })

const scoreController = Object.freeze({
  notFound,
  postScore,
})

export default scoreController
export { notFound, postScore }