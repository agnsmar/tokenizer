import { Grammar } from '../src/Grammar.js'
import { TokenType } from '../src/TokenType.js'

// Word and Dot grammar.
const word = new TokenType('WORD', /^[\w|åäöÅÄÖ]+/)
const dot = new TokenType('DOT', /^\./)
export const wordAndDot = new Grammar()
wordAndDot.addTokenType(word)
wordAndDot.addTokenType(dot)

// Arithmetic Grammar.
const number = new TokenType('NUMBER', /^[0-9]+(\.([0-9])+)?/)
const add = new TokenType('ADD', /^[+]/)
const mul = new TokenType('MUL', /^[*]/)
const sub = new TokenType('SUB', /^[-]/)
const div = new TokenType('DIV', /^[/]/)
const openPar = new TokenType('OPENPAR', /^[(]/)
const closePar = new TokenType('CLOSEPAR', /^[)]/)
export const arithmetic = new Grammar()
arithmetic.addTokenType(number)
arithmetic.addTokenType(add)
arithmetic.addTokenType(mul)
arithmetic.addTokenType(sub)
arithmetic.addTokenType(div)
arithmetic.addTokenType(openPar)
arithmetic.addTokenType(closePar)

// Maximal Munch Grammar.
const float = new TokenType('FLOAT', /^[0-9]+\.[0-9]+/)
const integer = new TokenType('INTEGER', /^[0-9]+/)

export const maximalMunch = new Grammar()

maximalMunch.addTokenType(float)
maximalMunch.addTokenType(integer)
