/**
 * Tests for the Tokenizer class.
 */

import chai from 'chai'
import { Tokenizer } from '../src/Tokenizer.js'

const expect = chai.expect

describe('Example 1', () => {
  describe('return value', () => {
    it('\'Meningen består av ord\' should return [\'Meningen\', \'består\', \'av\', \'ord\', \'.\']', () => {
      const textTokenizer = new Tokenizer('grammar', 'Meningen består av ord.')
      expect(textTokenizer.showTokens()).to.eql(['Meningen', 'består', 'av', 'ord', '.'])
    })
  })
})
