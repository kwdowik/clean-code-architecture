import buildMakeTeam from './team'
import Id from '../id'
import crypto from 'crypto'

const makeTeam = buildMakeTeam({ Id, md5 })

export default makeTeam

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}
