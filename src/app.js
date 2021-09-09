import { Grammar } from './Grammar.js'
import { Tokenizer } from './Tokenizer.js'

const regex = /^[\w|åäöÅÄÖ]+/
const wordAndDotGrammar = new Grammar(regex)

const testTokenizer = new Tokenizer(wordAndDotGrammar, 'Meningen består av ord.')

testTokenizer.tokenize()
