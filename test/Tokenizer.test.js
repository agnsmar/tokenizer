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
const sub = new TokenType('SUB', /^[-]/)
const div = new TokenType('DIV', /^[/]/)
const openPar = new TokenType('OPENPAR', /^[(]/)
const closePar = new TokenType('CLOSEPAR', /^[)]/)
const arithmeticGrammar = new Grammar()
arithmeticGrammar.addTokenType(number)
arithmeticGrammar.addTokenType(add)
arithmeticGrammar.addTokenType(mul)
arithmeticGrammar.addTokenType(sub)
arithmeticGrammar.addTokenType(div)
arithmeticGrammar.addTokenType(openPar)
arithmeticGrammar.addTokenType(closePar)

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
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'a' })
    })

    it('[TC2]: \'a aa\' [>] should return WORD(\'aa\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a aa')
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'aa' })
    })

    it('[TC3]: \'a.b\' [>] should return DOT(\'.\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC4]: \'a.b\' [>>] should return WORD(\'b\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
      textTokenizer.moveNext(2)
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'b' })
    })

    it('[TC5]: \'aa. b\' [>>] should return WORD(\'b\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'aa.b')
      textTokenizer.moveNext(2)
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'b' })
    })

    it('[TC6]: \'a .b\' [>><] should return DOT(\'.\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a .b')
      textTokenizer.moveNext(2)
      textTokenizer.moveBack()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC7]: \'\' [] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, '')

      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC8]: \' \' [] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, ' ')

      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC9]: \'a\' [>] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a')
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC10]: \'a\' [>] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a')
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC11]: \'!\' [] should return Exception(\'No lexical element matches \'!\'\')', () => {
      const textTokenizer = new Tokenizer(wordAndDotGrammar, '!')
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'!\'' })
    })
  })
})

describe('arithmeticGrammar [Example 2]', () => {
  describe('return value', () => {
    it('[TC12]: \'3\' [] should return NUMBER(\'3\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3')

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'NUMBER', value: '3' })
    })

    it('[TC13]: \'3.14\' [] should return NUMBER(\'3.14\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3.14')

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'NUMBER', value: '3.14' })
    })

    it('[TC14]: \'3 + 54 * 4\' [>>>] should return MUL(\'*\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3 + 54 * 4')

      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'MUL', value: '*' })
    })

    it('[TC15]: \'3+5 # 4\' [>>>] should return Exception(\'No lexical element matches \'# 4\'\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3+5 # 4')

      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'# 4\'' })
    })

    it('[TC16]: \'3.0+54.1     + 4.2\' [><>>>] should return ADD(\'+\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3.0+54.1     + 4.2')

      arithmeticTokenizer.moveNext()
      arithmeticTokenizer.moveBack()
      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'ADD', value: '+' })
    })

    it('[TC17]: \'(15+3) * 10\' [] should return OPENPAR(\'(\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '(15+3) * 10')

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'OPENPAR', value: '(' })
    })

    it('[TC18]: \'(5 + 3+1) / 13 + 10\' [>>>>>>] should return CLOSEPAR(\')\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '(5 + 3+1) / 13 + 10')

      arithmeticTokenizer.moveNext(6)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'CLOSEPAR', value: ')' })
    })

    it('[TC19]: \'(1 + 4) / (13 * 10)\' [>>>>>><] should return DIV(\'/\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '(1 + 4) / (13 * 10)')

      arithmeticTokenizer.moveNext(6)
      arithmeticTokenizer.moveBack()
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'DIV', value: '/' })
    })

    it('[TC20]: \'3- 14\' [>] should return SUB(\'-\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3- 14')

      arithmeticTokenizer.moveNext()
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'SUB', value: '-' })
    })

    it('[TC21]: \'(1 - 1) * 13\' [>>>>] should return CLOSEPAR(\')\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '(1 - 1) * 13')

      arithmeticTokenizer.moveNext(4)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'CLOSEPAR', value: ')' })
    })

    it('[TC22]: \'80 / 13\' [>] should return DIV(\'/\')', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '80 / 13')

      arithmeticTokenizer.moveNext()
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'DIV', value: '/' })
    })
  })
})

describe('maximalMunchGrammar [Example 3]', () => {
  describe('return value', () => {
    it('[TC23]: \'3.14\' [] should return FLOAT(\'3.14\')', () => {
      const maximalMunchTokenizer = new Tokenizer(maximalMunchGrammar, '3.14 5')

      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'FLOAT', value: '3.14' })
    })
  })
})

describe('moveBack() and moveNext()', () => {
  describe('return value', () => {
    it('\'Hello everyone.\' [>>] should return DOT(\'.\')', () => {
      const wordAndDotTokenizer = new Tokenizer(wordAndDotGrammar, 'Hello everyone.')

      wordAndDotTokenizer.moveNext(2)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('\'Hello everyone.\' [>>>] should return END(\'null\')', () => {
      const wordAndDotTokenizer = new Tokenizer(wordAndDotGrammar, 'Hello everyone.')

      wordAndDotTokenizer.moveNext(3)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('\'Hello everyone.\' [>>>>>] should return END(\'null\')', () => {
      const wordAndDotTokenizer = new Tokenizer(wordAndDotGrammar, 'Hello everyone.')

      wordAndDotTokenizer.moveNext(5)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('\'Hello everyone.\' [>>><<>>>>] should return END(\'null\')', () => {
      const wordAndDotTokenizer = new Tokenizer(wordAndDotGrammar, 'Hello everyone.')

      wordAndDotTokenizer.moveNext(3)
      wordAndDotTokenizer.moveBack(2)
      wordAndDotTokenizer.moveNext(4)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('\'Goodbye everybody.\' [<] should return WORD(\'Goodbye\')', () => {
      const wordAndDotTokenizer = new Tokenizer(wordAndDotGrammar, 'Goodbye everybody.')

      wordAndDotTokenizer.moveBack()
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'Goodbye' })
    })

    it('\'Goodbye everybody.\' [<<<] should return WORD(\'Goodbye\')', () => {
      const wordAndDotTokenizer = new Tokenizer(wordAndDotGrammar, 'Goodbye everybody.')

      wordAndDotTokenizer.moveBack(3)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'Goodbye' })
    })

    it('\'Goodbye everybody.\' [>>><<<<] should return WORD(\'Goodbye\')', () => {
      const wordAndDotTokenizer = new Tokenizer(wordAndDotGrammar, 'Goodbye everybody.')

      wordAndDotTokenizer.moveNext(3)
      wordAndDotTokenizer.moveBack(4)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'Goodbye' })
    })

    it('\'Hello again everybody.\' [<<<<>] should return WORD(\'again\')', () => {
      const wordAndDotTokenizer = new Tokenizer(wordAndDotGrammar, 'Hello again everybody.')

      wordAndDotTokenizer.moveBack(3)
      wordAndDotTokenizer.moveNext()
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'again' })
    })
  })
})
