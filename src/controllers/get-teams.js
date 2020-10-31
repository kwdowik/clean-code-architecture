export default function makeGetTeams ({ listTeams }) {
  return async function getTeams () {
    try {
      const teams = await listTeams()
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: { teams }
      }
    } catch (err) {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: { error: err.message }
      }
    }
  }
}
