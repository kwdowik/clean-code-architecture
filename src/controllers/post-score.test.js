import makePostScore from './post-score'
import makeFakeScore from '../../__test__/fixtures/score'

describe('post score controller', () => {
  it('successfully posts a score', async () => {
    const postScore = makePostScore({ addScore: s => s })
    const score = makeFakeScore()
    const request = {
      headers: {
        'Content-Type': 'application/json'
        // 'User-Agent': score.source.browser
      },
      body: score
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(request.body.modifiedOn).toUTCString()
      },
      statusCode: 201,
      body: { posted: request.body }
    }
    const actual = await postScore(request)
    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const postScore = makePostScore({
      addScore: () => {
        throw Error('Pow!')
      }
    })
    const fakeScore = makeFakeScore()
    const request = {
      headers: {
        'Content-Type': 'application/json'
        // 'User-Agent': fakeScore.source.browser
      },
      body: fakeScore
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    }
    const actual = await postScore(request)
    expect(actual).toEqual(expected)
  })
})
