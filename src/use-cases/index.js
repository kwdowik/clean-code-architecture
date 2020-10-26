import makeAddScore from './add-score'
import makeListScores from './list-scores'
import scoresDb from '../data-access'
import { seedDb } from '../data-access/seeder'

const addScore = makeAddScore({ scoresDb })
const listScores = makeListScores({ scoresDb })
seedDb({ scoresDb, amount: 3 })

const scoreService = Object.freeze({
  addScore,
  listScores
})

export default scoreService

export { addScore, listScores }
