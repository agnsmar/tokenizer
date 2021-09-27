/**
 * Tests for the Tokenizer class.
 */

import chai from 'chai'

import { Tokenizer } from '../src/Tokenizer.js'
import * as grammar from './exampleGrammars.js'
const expect = chai.expect

describe('wordAndDot [Example 1]', () => {
  describe('return value', () => {
    it('[TC1]: \'a\' [] should return WORD(\'a\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, 'a')
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'a' })
    })

    it('[TC2]: \'a aa\' [>] should return WORD(\'aa\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, 'a aa')
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'aa' })
    })

    it('[TC3]: \'a.b\' [>] should return DOT(\'.\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, 'a.b')
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC4]: \'a.b\' [>>] should return WORD(\'b\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, 'a.b')
      textTokenizer.moveNext(2)
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'b' })
    })

    it('[TC5]: \'aa. b\' [>>] should return WORD(\'b\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, 'aa.b')
      textTokenizer.moveNext(2)
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'b' })
    })

    it('[TC6]: \'a .b\' [>><] should return DOT(\'.\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, 'a .b')
      textTokenizer.moveNext(2)
      textTokenizer.moveBack()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC7]: \'\' [] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, '')

      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC8]: \' \' [] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, ' ')

      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC9]: \'a\' [>] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, 'a')
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC10]: \'a\' [<] should return END(\'null\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, 'a')
      textTokenizer.moveBack()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'a' })
    })

    it('[TC11]: \'!\' [] should return Exception(\'No lexical element matches \'!\'\')', () => {
      const textTokenizer = new Tokenizer(grammar.wordAndDot, '!')
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'!\'' })
    })
  })
})

describe('arithmetic [Example 2]', () => {
  describe('return value', () => {
    it('[TC12]: \'3\' [] should return NUMBER(\'3\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '3')

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'NUMBER', value: '3' })
    })

    it('[TC13]: \'3.14\' [] should return NUMBER(\'3.14\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '3.14')

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'NUMBER', value: '3.14' })
    })

    it('[TC14]: \'3 + 54 * 4\' [>>>] should return MUL(\'*\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '3 + 54 * 4')

      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'MUL', value: '*' })
    })

    it('[TC15]: \'3+5 # 4\' [>>>] should return Exception(\'No lexical element matches \'# 4\'\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '3+5 # 4')

      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'# 4\'' })
    })

    it('[TC16]: \'3.0+54.1     + 4.2\' [><>>>] should return ADD(\'+\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '3.0+54.1     + 4.2')

      arithmeticTokenizer.moveNext()
      arithmeticTokenizer.moveBack()
      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'ADD', value: '+' })
    })

    it('[TC17]: \'(15+3) * 10\' [] should return OPENPAR(\'(\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '(15+3) * 10')

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'OPENPAR', value: '(' })
    })

    it('[TC18]: \'(5 + 3+1) / 13 + 10\' [>>>>>>] should return CLOSEPAR(\')\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '(5 + 3+1) / 13 + 10')

      arithmeticTokenizer.moveNext(6)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'CLOSEPAR', value: ')' })
    })

    it('[TC19]: \'(1 + 4) / (13 * 10)\' [>>>>>><] should return DIV(\'/\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '(1 + 4) / (13 * 10)')

      arithmeticTokenizer.moveNext(6)
      arithmeticTokenizer.moveBack()
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'DIV', value: '/' })
    })

    it('[TC20]: \'3- 14\' [>] should return SUB(\'-\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '3- 14')

      arithmeticTokenizer.moveNext()
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'SUB', value: '-' })
    })

    it('[TC21]: \'(1 - 1) * 13\' [>>>>] should return CLOSEPAR(\')\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '(1 - 1) * 13')

      arithmeticTokenizer.moveNext(4)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'CLOSEPAR', value: ')' })
    })

    it('[TC22]: \'80 / 13\' [>] should return DIV(\'/\')', () => {
      const arithmeticTokenizer = new Tokenizer(grammar.arithmetic, '80 / 13')

      arithmeticTokenizer.moveNext()
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'DIV', value: '/' })
    })
  })
})

describe('maximalMunchTester [Example 3]', () => {
  describe('return value', () => {
    it('[TC23]: \'3.14\' [] should return FLOAT(\'3.14\')', () => {
      const maximalMunchTokenizer = new Tokenizer(grammar.maximalMunchTester, '3.14 5')

      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'FLOAT', value: '3.14' })
    })

    it('[TC24]: \'13.9    14\' [>] should return INTEGER(\'14\')', () => {
      const maximalMunchTokenizer = new Tokenizer(grammar.maximalMunchTester, '13.9    14')

      maximalMunchTokenizer.moveNext()
      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'INTEGER', value: '14' })
    })

    it('[TC25]: \'0.1 0.2 13 0.1000\' [>>>] should return FLOAT(\'0.1000\')', () => {
      const maximalMunchTokenizer = new Tokenizer(grammar.maximalMunchTester, '0.1 0.2 13 0.1000')

      maximalMunchTokenizer.moveNext(3)
      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'FLOAT', value: '0.1000' })
    })

    it('[TC26]: \'10 9,2\' [>>] should return Exception(\'No lexical element matches \',2\'\')', () => {
      const maximalMunchTokenizer = new Tokenizer(grammar.maximalMunchTester, '10 9,2')

      maximalMunchTokenizer.moveNext(2)
      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \',2\'' })
    })

    it('[TC27]: \'192.168.1.1\' [] should return FLOAT(\'192.168\')', () => {
      const maximalMunchTokenizer = new Tokenizer(grammar.maximalMunchTester, '192.168.1.1')

      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'FLOAT', value: '192.168' })
    })

    it('[TC28]: \'192.168.1.1\' [>] should return Exception(\'No lexical element matches \'.1.1\'\')', () => {
      const maximalMunchTokenizer = new Tokenizer(grammar.maximalMunchTester, '192.168.1.1')

      maximalMunchTokenizer.moveNext()
      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'.1.1\'' })
    })

    it('[TC29]: \'0 .1\' [>] should return Exception(\'No lexical element matches \'.1\'\')', () => {
      const maximalMunchTokenizer = new Tokenizer(grammar.maximalMunchTester, '0 .1')

      maximalMunchTokenizer.moveNext()
      expect(maximalMunchTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'.1\'' })
    })
  })
})

describe('moveBack() and moveNext()', () => {
  describe('return value', () => {
    it('[TC30]\'Hello everyone.\' [>>] should return DOT(\'.\')', () => {
      const wordAndDotTokenizer = new Tokenizer(grammar.wordAndDot, 'Hello everyone.')

      wordAndDotTokenizer.moveNext(2)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC31]\'Hello everyone.\' [>>>] should return END(\'null\')', () => {
      const wordAndDotTokenizer = new Tokenizer(grammar.wordAndDot, 'Hello everyone.')

      wordAndDotTokenizer.moveNext(3)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC32]\'Hello everyone.\' [>>>>>] should return END(\'null\')', () => {
      const wordAndDotTokenizer = new Tokenizer(grammar.wordAndDot, 'Hello everyone.')

      wordAndDotTokenizer.moveNext(5)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC33]\'Hello everyone.\' [>>><<>>>>] should return END(\'null\')', () => {
      const wordAndDotTokenizer = new Tokenizer(grammar.wordAndDot, 'Hello everyone.')

      wordAndDotTokenizer.moveNext(3)
      wordAndDotTokenizer.moveBack(2)
      wordAndDotTokenizer.moveNext(4)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC34]\'Goodbye everybody.\' [<] should return WORD(\'Goodbye\')', () => {
      const wordAndDotTokenizer = new Tokenizer(grammar.wordAndDot, 'Goodbye everybody.')

      wordAndDotTokenizer.moveBack()
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'Goodbye' })
    })

    it('[TC35]\'Goodbye everybody.\' [<<<] should return WORD(\'Goodbye\')', () => {
      const wordAndDotTokenizer = new Tokenizer(grammar.wordAndDot, 'Goodbye everybody.')

      wordAndDotTokenizer.moveBack(3)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'Goodbye' })
    })

    it('[TC36]\'Goodbye everybody.\' [>>><<<<] should return WORD(\'Goodbye\')', () => {
      const wordAndDotTokenizer = new Tokenizer(grammar.wordAndDot, 'Goodbye everybody.')

      wordAndDotTokenizer.moveNext(3)
      wordAndDotTokenizer.moveBack(4)
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'Goodbye' })
    })

    it('[TC37]\'Hello again everybody.\' [<<<<>] should return WORD(\'again\')', () => {
      const wordAndDotTokenizer = new Tokenizer(grammar.wordAndDot, 'Hello again everybody.')

      wordAndDotTokenizer.moveBack(3)
      wordAndDotTokenizer.moveNext()
      expect(wordAndDotTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'again' })
    })
  })
})
