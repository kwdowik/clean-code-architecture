import makeAddScore from './add-score'
import makeListScores from './list-scores'
import makeListTeams from './list-teams'
import { scoresDb, teamsDb } from '../data-access'

const addScore = makeAddScore({ scoresDb })
const listScores = makeListScores({ scoresDb })
const listTeams = makeListTeams({ teamsDb })

const scoreService = Object.freeze({
  addScore,
  listScores,
  listTeams
})

export default scoreService

export { addScore, listScores, listTeams }
