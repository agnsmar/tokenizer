import { Grammar } from './Grammar.js'
import { Tokenizer } from './Tokenizer.js'
import { TokenType } from './TokenType.js'

const word = new TokenType('Word', /^[\w|åäöÅÄÖ]+/)
const dot = new TokenType('Dot', /^\./)
const wordAndDotGrammar = new Grammar()
wordAndDotGrammar.addTokenType(word)
wordAndDotGrammar.addTokenType(dot)

const testTokenizer = new Tokenizer(wordAndDotGrammar, 'Meningen består av ord. En sjukt jävla massa ord faktiskt. Ganska galet hur mycket ord man kan få plats med i en sträng.')

testTokenizer.tokenize()
console.table(testTokenizer.getTokens())
