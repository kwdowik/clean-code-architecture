import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
  notFound,
  postScore,
  getScores,
  getTeams
} from './controllers'
import makeCallback from './express-callback'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cors())
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
  res.set({ Tk: '!' })
  next()
})
app.post('/scores', makeCallback(postScore))
app.get('/scores', makeCallback(getScores))
app.get('/teams', makeCallback(getTeams))
app.use(makeCallback(notFound))

// listen for requests
app.listen(process.env.API_PORT, () => {
  console.log(`Server is listening on port ${process.env.API_PORT}`)
})

export default app
