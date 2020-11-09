export default function buildMakeTeam ({ Id, md5 }) {
  return function makeTeam ({
    id = Id.makeId(),
    createdOn = Date.now(),
    modifiedOn = Date.now(),
    name
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Team must have a valid id.')
    }
    if (!name) {
      throw new Error('Team must have a name.')
    }
    if (name.length < 3) {
      throw new Error('Team`s name must be longer than 3 characters.')
    }
    let hash

    return Object.freeze({
      getName: () => name,
      getId: () => id,
      getHash: () => hash || (hash = makeHash()),
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn
    })

    function makeHash () {
      return md5(name || '')
    }
  }
}
