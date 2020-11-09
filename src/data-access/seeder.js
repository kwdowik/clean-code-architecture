import faker from 'faker'
import Id from '../entities/id'
import makeScore from '../entities/score'
import makeTeams from '../entities/team'

async function seedScoresDb ({ teamsDb, scoresDb, amount }) {
  const scores = await scoresDb.findAll()
  if (scores.length !== 0) {
    return
  }
  const teams = await teamsDb.findAll()
  for (let i = 0; i <= amount; i++) {
    const score = makeScore({
      user: faker.name.findName(),
      id: Id.makeId(),
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      categoryId: i.toString(),
      teamId: i < teams.length ? teams[i].id : i.toString(),
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

async function seedTeamsDb ({ teamsDb, amount }) {
  const teams = await teamsDb.findAll()
  if (teams.length !== 0) {
    return
  }
  for (let i = 0; i <= amount; i++) {
    const team = makeTeams({
      id: Id.makeId(),
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      name: faker.name.findName()
    })
    teamsDb.insert({
      name: team.getName(),
      createdOn: team.getCreatedOn(),
      hash: team.getHash(),
      id: team.getId(),
      modifiedOn: team.getModifiedOn()
    })
  }
}

export default async function seedDb ({ scoresDb, teamsDb, amount }) {
  await seedTeamsDb({ teamsDb, amount })
  await seedScoresDb({ teamsDb, scoresDb, amount })
}
