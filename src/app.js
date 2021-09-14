import { Grammar } from './Grammar.js'
import { Tokenizer } from './Tokenizer.js'
import { TokenType } from './TokenType.js'

// wordAndDotGrammar Example
const word = new TokenType('WORD', /^[a-zA-Z|åäöÅÄÖ]+/)
const dot = new TokenType('DOT', /^\./)
const wordAndDotGrammar = new Grammar()
wordAndDotGrammar.addTokenType(word)
wordAndDotGrammar.addTokenType(dot)

const textTokenizer = new Tokenizer(wordAndDotGrammar, 'Meningen består av ord.')

textTokenizer.tokenize()
console.table(textTokenizer.getTokens())

// arithmeticGrammar Example
const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
const add = new TokenType('ADD', /^[+]/)
const mul = new TokenType('MUL', /^[*]/)
const arithmeticGrammar = new Grammar()
arithmeticGrammar.addTokenType(number)
arithmeticGrammar.addTokenType(add)
arithmeticGrammar.addTokenType(mul)

const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3.12 4 45 + 30 * 3')

arithmeticTokenizer.tokenize()
console.table(arithmeticTokenizer.getTokens())

// MaximalMunchGrammar Example

const float = new TokenType('FLOAT', /^[0-9]+\.[0-9]+/)
const integer = new TokenType('INTEGER', /^[0-9]+/)

const maximalMunchGrammar = new Grammar()

maximalMunchGrammar.addTokenType(float)
maximalMunchGrammar.addTokenType(integer)

const maximalMunchTokenizer = new Tokenizer(maximalMunchGrammar, '3.14 5')

maximalMunchTokenizer.tokenize()
console.table(maximalMunchTokenizer.getTokens())
