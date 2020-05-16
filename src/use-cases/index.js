import makeAddScore from './add-score'
import makeListScores from './list-scores'
import scoresDb from '../data-access'

const addScore = makeAddScore({ scoresDb });
const listScores = makeListScores({ scoresDb });

const scoreService = Object.freeze({
  addScore,
  listScores
})

export default scoreService

export { addScore, listScores }
