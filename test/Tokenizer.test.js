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
    type: 'WORD',
    value: 'Meningen'
  },
  {
    type: 'WORD',
    value: 'består'
  },
  {
    type: 'WORD',
    value: 'av'
  },
  {
    type: 'WORD',
    value: 'ord'
  },
  {
    type: 'DOT',
    value: '.'
  },
  {
    type: 'END',
    value: null
  }]
const ex1ResultString = ex1Result.map((token) => {
  return `\n\t${token.type}('${token.value}')`
})

const ex2Result = [
  {
    type: 'NUMBER',
    value: '3'
  },
  {
    type: 'ADD',
    value: '+'
  },
  {
    type: 'NUMBER',
    value: '2'
  },
  {
    type: 'END',
    value: null
  }]
const ex2ResultString = ex2Result.map((token) => {
  return `\n\t${token.type}('${token.value}')`
})

const ex3Result = [
  {
    type: 'FLOAT',
    value: '3.14'
  },
  {
    type: 'INTEGER',
    value: '5'
  },
  {
    type: 'END',
    value: null
  }]
const ex3ResultString = ex3Result.map((token) => {
  return `\n\t${token.type}('${token.value}')`
})

describe('wordAndDotGrammar [Example 1]', () => {
  describe('return value', () => {
    it(`'Meningen består av ord' should return ${ex1ResultString}`, () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'Meningen består av ord.')
      textTokenizer.tokenize()
      expect(textTokenizer.getTokens()).to.eql(ex1Result)
    })

    it('[TC1]: \'a\' [] should return WORD(\'a\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a')
      textTokenizer.tokenize()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'a' })
    })

    it('[TC2]: \'a aa\' [>] should return WORD(\'aa\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a aa')
      textTokenizer.tokenize()
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'aa' })
    })

    it('[TC3]: \'a.b\' [>] should return DOT(\'.\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
      textTokenizer.tokenize()
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC4]: \'a.b\' [>>] should return WORD(\'b\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a.b')
      textTokenizer.tokenize()
      textTokenizer.moveNext(2)
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'b' })
    })

    it('[TC5]: \'aa. b\' [>>] should return WORD(\'b\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'aa.b')
      textTokenizer.tokenize()
      textTokenizer.moveNext(2)
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'WORD', value: 'b' })
    })

    it('[TC6]: \'a .b\' [>><] should return DOT(\'.\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a .b')
      textTokenizer.tokenize()
      textTokenizer.moveNext(2)
      textTokenizer.moveBack()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'DOT', value: '.' })
    })

    it('[TC7]: \'\' [] should return END(\'null\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, '')
      textTokenizer.tokenize()

      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC8]: \' \' [] should return END(\'null\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, ' ')
      textTokenizer.tokenize()

      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC9]: \'a\' [>] should return END(\'null\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a')
      textTokenizer.tokenize()
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC10]: \'a\' [>] should return END(\'null\')', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, 'a')
      textTokenizer.tokenize()
      textTokenizer.moveNext()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'END', value: null })
    })

    it('[TC11]: \'!\' [] should return Exception', () => {
      const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
      const dot = new TokenType('DOT', /^\./)
      const wordAndDotGrammar = new Grammar()
      wordAndDotGrammar.addTokenType(word)
      wordAndDotGrammar.addTokenType(dot)

      const textTokenizer = new Tokenizer(wordAndDotGrammar, '!')
      textTokenizer.tokenize()
      expect(textTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'!\'' })
    })
  })
})

describe('arithmeticGrammar [Example 2]', () => {
  describe('return value', () => {
    it(`'3 + 2' should return ${ex2ResultString}`, () => {
      const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
      const add = new TokenType('ADD', /^[+]/)
      const mul = new TokenType('MUL', /^[*]/)
      const arithmeticGrammar = new Grammar()
      arithmeticGrammar.addTokenType(number)
      arithmeticGrammar.addTokenType(add)
      arithmeticGrammar.addTokenType(mul)

      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3 + 2')

      arithmeticTokenizer.tokenize()

      expect(arithmeticTokenizer.getTokens()).to.eql(ex2Result)
    })

    it('[TC12]: \'3\' [] should return NUMBER(\'3\')', () => {
      const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
      const add = new TokenType('ADD', /^[+]/)
      const mul = new TokenType('MUL', /^[*]/)
      const arithmeticGrammar = new Grammar()
      arithmeticGrammar.addTokenType(number)
      arithmeticGrammar.addTokenType(add)
      arithmeticGrammar.addTokenType(mul)

      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3')

      arithmeticTokenizer.tokenize()

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'NUMBER', value: '3' })
    })

    it('[TC13]: \'3.14\' [] should return NUMBER(\'3.14\')', () => {
      const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
      const add = new TokenType('ADD', /^[+]/)
      const mul = new TokenType('MUL', /^[*]/)
      const arithmeticGrammar = new Grammar()
      arithmeticGrammar.addTokenType(number)
      arithmeticGrammar.addTokenType(add)
      arithmeticGrammar.addTokenType(mul)

      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3.14')

      arithmeticTokenizer.tokenize()

      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'NUMBER', value: '3.14' })
    })

    it('[TC14]: \'3 + 54 * 4\' [>>>] should return MUL(\'*\')', () => {
      const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
      const add = new TokenType('ADD', /^[+]/)
      const mul = new TokenType('MUL', /^[*]/)
      const arithmeticGrammar = new Grammar()
      arithmeticGrammar.addTokenType(number)
      arithmeticGrammar.addTokenType(add)
      arithmeticGrammar.addTokenType(mul)

      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3 + 54 * 4')

      arithmeticTokenizer.tokenize()

      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'MUL', value: '*' })
    })

    it('[TC15]: \'3+5 # 4\' [>>>] should return Exception', () => {
      const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
      const add = new TokenType('ADD', /^[+]/)
      const mul = new TokenType('MUL', /^[*]/)
      const arithmeticGrammar = new Grammar()
      arithmeticGrammar.addTokenType(number)
      arithmeticGrammar.addTokenType(add)
      arithmeticGrammar.addTokenType(mul)

      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3+5 # 4')

      arithmeticTokenizer.tokenize()

      arithmeticTokenizer.moveNext(3)
      expect(arithmeticTokenizer.getActiveToken()).to.eql({ type: 'Exception', value: 'No lexical element matches \'# 4\'' })
    })

    it('[TC16]: \'3.0+54.1     + 4.2\' [><>>>] should return ADD(\'+\')', () => {
      const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
      const add = new TokenType('ADD', /^[+]/)
      const mul = new TokenType('MUL', /^[*]/)
      const arithmeticGrammar = new Grammar()
      arithmeticGrammar.addTokenType(number)
      arithmeticGrammar.addTokenType(add)
      arithmeticGrammar.addTokenType(mul)

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
    it(`'3.14 5' should return ${ex3ResultString}`, () => {
      const float = new TokenType('FLOAT', /^[0-9]+\.[0-9]+/)
      const integer = new TokenType('INTEGER', /^[0-9]+/)

      const maximalMunchGrammar = new Grammar()

      maximalMunchGrammar.addTokenType(float)
      maximalMunchGrammar.addTokenType(integer)

      const maximalMunchTokenizer = new Tokenizer(maximalMunchGrammar, '3.14 5')

      maximalMunchTokenizer.tokenize()
      maximalMunchTokenizer.getTokens()
      expect(maximalMunchTokenizer.getTokens()).to.eql(ex3Result)
    })
  })
})
