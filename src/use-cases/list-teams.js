export default function makeListScores ({ teamsDb }) {
  return async function listTeams () {
    const teams = await teamsDb.findAll()
    return teams
  }
}
