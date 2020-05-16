export default function makeGetScores ({ listScores }) {
  return async function getScores (httpRequest) {
    try {
      const scores = await listScores()
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: { scores }
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
