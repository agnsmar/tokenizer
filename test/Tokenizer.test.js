/**
 * Tests for the Tokenizer class.
 */

import chai from 'chai'
import { Grammar } from '../src/Grammar.js'
import { Tokenizer } from '../src/Tokenizer.js'
import { TokenType } from '../src/TokenType.js'

const expect = chai.expect

// Word and Dot grammar.
const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
const dot = new TokenType('DOT', /^\./)
const wordAndDotGrammar = new Grammar()
wordAndDotGrammar.addTokenType(word)
wordAndDotGrammar.addTokenType(dot)

// Arithmetic Grammar.
const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
const add = new TokenType('ADD', /^[+]/)
const mul = new TokenType('MUL', /^[*]/)
const arithmeticGrammar = new Grammar()
arithmeticGrammar.addTokenType(number)
arithmeticGrammar.addTokenType(add)
arithmeticGrammar.addTokenType(mul)

// Maximal Munch Grammar.
const float = new TokenType('FLOAT', /^[0-9]+\.[0-9]+/)
const integer = new TokenType('INTEGER', /^[0-9]+/)

const maximalMunchGrammar = new Grammar()

maximalMunchGrammar.addTokenType(float)
maximalMunchGrammar.addTokenType(integer)

describe('wordAndDotGrammar [Example 1]', () => {
  describe('return value', () => {
    it('[TC1]: \'a\' [] should return WORD(\'a\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a')
      textTokenizer.tokenize()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'a' })
    })

    it('[TC2]: \'a aa\' [>] should return WORD(\'aa\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a aa')
      textTokenizer.tokenize()
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'aa' })
    })

    it('[TC3]: \'a.b\' [>] should return DOT(\'.\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
      textTokenizer.tokenize()
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC4]: \'a.b\' [>>] should return WORD(\'b\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
      textTokenizer.tokenize()
      textTokenizer.moveNext(2)
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'b' })
    })

    it('[TC5]: \'aa. b\' [>>] should return WORD(\'b\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'aa.b')
      textTokenizer.tokenize()
      textTokenizer.moveNext(2)
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'b' })
    })

    it('[TC6]: \'a .b\' [>><] should return DOT(\'.\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a .b')
      textTokenizer.tokenize()
      textTokenizer.moveNext(2)
      textTokenizer.moveBack()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC7]: \'\' [] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, '')
      textTokenizer.tokenize()

      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC8]: \' \' [] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, ' ')
      textTokenizer.tokenize()

      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC9]: \'a\' [>] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a')
      textTokenizer.tokenize()
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC10]: \'a\' [>] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a')
      textTokenizer.tokenize()
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC11]: \'!\' [] should return Exception', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, '!')
      textTokenizer.tokenize()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'!\'' })
    })
  })
})

describe('arithmeticGrammar [Example 2]', () => {
  describe('return value', () => {
    it('[TC12]: \'3\' [] should return NUMBER(\'3\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3')

      arithmeticTokenizer.tokenize()

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'NUMBER', value: '3' })
    })

    it('[TC13]: \'3.14\' [] should return NUMBER(\'3.14\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3.14')

      arithmeticTokenizer.tokenize()

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'NUMBER', value: '3.14' })
    })

    it('[TC14]: \'3 + 54 * 4\' [>>>] should return MUL(\'*\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3 + 54 * 4')

      arithmeticTokenizer.tokenize()

      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'MUL', value: '*' })
    })

    it('[TC15]: \'3+5 # 4\' [>>>] should return Exception', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3+5 # 4')

      arithmeticTokenizer.tokenize()

      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'# 4\'' })
    })

    it('[TC16]: \'3.0+54.1     + 4.2\' [><>>>] should return ADD(\'+\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3.0+54.1     + 4.2')

      arithmeticTokenizer.tokenize()

      arithmeticTokenizer.moveNext()
      arithmeticTokenizer.moveBack()
      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'ADD', value: '+' })
    })
  })
})

describe('maximalMunchGrammar [Example 3]', () => {
  describe('return value', () => {
    it('[TC17]: \'3.14\' [] should return FLOAT(\'3.14\')', () => {
      const maximalMunchTokenizer = new Tokenizer(maximalMunchGrammar, '3.14 5')

      maximalMunchTokenizer.tokenize()

      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'FLOAT', value: '3.14' })
    })
  })
})
