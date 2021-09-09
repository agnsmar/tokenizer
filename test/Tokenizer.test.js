/**
 * Tests for the Tokenizer class.
 */

import chai from 'chai'
import { Tokenizer } from '../src/Tokenizer.js'

const expect = chai.expect

describe('Example 1', () => {
  it('Meningen består av ord.', () => {
    const textTokenizer = new Tokenizer('grammar', 'Meningen består av ord.')
    expect(textTokenizer.showTokens()).to.eql(['Meningen', 'består', 'av', 'ord', '.'])
  })
})
