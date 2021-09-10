/**
 * Tests for the Tokenizer class.
 */

import chai from 'chai'
import { Grammar } from '../src/Grammar.js'
import { Tokenizer } from '../src/Tokenizer.js'
import { TokenType } from '../src/TokenType.js'

const expect = chai.expect
const ex1Result = [
  {
    type: 'Word',
    value: 'Meningen'
  },
  {
    type: 'Word',
    value: 'består'
  },
  {
    type: 'Word',
    value: 'av'
  },
  {
    type: 'Word',
    value: 'ord'
  },
  {
    type: 'Dot',
    value: '.'
  }]
const ex1ResultString = ex1Result.map((token) => {
  return `\n\t${token.type}('${token.value}')`
})

describe('Example 1', () => {
  describe('return value', () => {
    it(`'Meningen består av ord' should return ${ex1ResultString}`, () => {
      const word = new TokenType('Word', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('Dot', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'Meningen består av ord.')
      textTokenizer.tokenize()
      expect(textTokenizer.getTokens()).to.eql(ex1Result)
    })
  })
})
