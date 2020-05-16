export default function makeListScore({ scoresDb }) {
  return async function listScores() {
    const scores = await scoresDb.findAll();
    return scores;
  }
};
