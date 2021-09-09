/**
 * Tests for the Tokenizer class.
 */

import chai from 'chai'
import { Grammar } from '../src/Grammar.js'
import { Tokenizer } from '../src/Tokenizer.js'

const expect = chai.expect

describe('Example 1', () => {
  describe('return value', () => {
    it('\'Meningen består av ord\' should return [\'Meningen\', \'består\', \'av\', \'ord\', \'.\']', () => {
      const regex = /^[\w|åäöÅÄÖ]+/
      const wordAndDotGrammar = new Grammar(regex)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'Meningen består av ord.')
      textTokenizer.tokenize()
      expect(textTokenizer.getTokens()).to.eql(['Meningen', 'består', 'av', 'ord', '.'])
    })
  })
})
