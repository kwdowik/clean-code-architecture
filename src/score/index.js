import buildMakeScore from './score';
import Id from '../id'
import crypto from 'crypto';

const makeScore = buildMakeScore({ Id, md5 })

export default makeScore

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}