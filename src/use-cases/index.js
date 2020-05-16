import makeAddScore from './add-score'
import scoresDb from '../data-access'

const addScore = makeAddScore({ scoresDb });

const scoreService = Object.freeze({
  addScore,
})

export default scoreService

export { addScore }