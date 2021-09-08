/**
 * Tests for the Tokenizer class.
 */

import chai from 'chai'
import { Tokenizer } from '../src/Tokenizer.js'

const expect = chai.expect
const testTokenizer = new Tokenizer()

describe('hello', () => {
  it('says hello', () => {
    expect(testTokenizer.sayHello()).to.equal('Hello')
  })
})
