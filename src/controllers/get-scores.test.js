import makeGetScores from './get-scores'
import makeFakeScore from '../../__test__/fixtures/score'

describe('get scores controller', () => {
  it('successfully get a scores', async () => {
    const score = makeFakeScore()
    const getScores = makeGetScores({ listScores: () => [score] })
    const request = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: { scores: [score] }
    }

    const actual = await getScores(request)
    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const getScores = makeGetScores({
      listScores: () => {
        throw Error('Pow!')
      }
    })
    const fakeScore = makeFakeScore()
    const request = {
      headers: {
        'Content-Type': 'application/json'
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

    const actual = await getScores(request)

    expect(actual).toEqual(expected)
  })
})
