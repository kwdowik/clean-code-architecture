export default function buildMakeScore({ Id, md5 }) {
  return function makeScore({
    user,
    id = Id.makeId(),
    createdOn = Date.now(),
    modifiedOn = Date.now(),
    categoryId,
    teamId,
    points
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Score must have a valid id.')
    }
    if (!user) {
      throw new Error('Score must have a user.')
    }
    if (user.length < 3) {
      throw new Error("Score user`s name must be longer than 3 characters.")
    }
    if (!categoryId) {
      throw new Error('Score must contain a categoryId.')
    }
    if (!teamId) {
      throw new Error('Score must contain a teamId.')
    }
    let hash

    return Object.freeze({
      getUser: () => user,
      getId: () => id,
      getHash: () => hash || (hash = makeHash()),
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      getCategoryId: () => categoryId,
      getTeamId: () => teamId,
      getPoints: () => points,
      setPoints: (val) => {
        if (points + val >= 0) {
          points += val;
        }
      }
    });

    function makeHash () {
      return md5(
          (user || '') +
          (teamId || '') +
          (categoryId || '')
      )
    }
  }
}