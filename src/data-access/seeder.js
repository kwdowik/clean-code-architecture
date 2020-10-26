import Id from '../Id'

export const seedDb = async ({ scoresDb }) => {
  const found = await scoresDb.findAll()
  if (found.length !== 0) {
    return
  }
  for (let i = 0; i <= 3; i++) {
    scoresDb.insert({
      id: Id.makeId(),
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      categoryId: i.toString(),
      teamId: i.toString(),
      points: i * 10
    })
  }
}
