import { Grammar } from '../../src/Grammar.js'
import { Tokenizer } from '../../src/Tokenizer.js'
import { TokenType } from '../../src/TokenType.js'
import { ConsoleUI } from '../view/ConsoleUI.js'

// wordAndDotGrammar Example
const word = new TokenType('WORD', /^[a-zA-Z|åäöÅÄÖ]+/)
const dot = new TokenType('DOT', /^\./)
const wordAndDotGrammar = new Grammar()
wordAndDotGrammar.addTokenType(word)
wordAndDotGrammar.addTokenType(dot)

const textTokenizer = new Tokenizer(wordAndDotGrammar, 'Meningen består av ord. 123 test test')

const ui = new ConsoleUI()
const MOVER_CHARS = {
  next: '>',
  back: '<'
}
do {
  ui.printWelcome()
  ui.printActiveToken(textTokenizer.getActiveToken())
  ui.printIndex(textTokenizer.activeTokenIndex)
  const direction = ui.getInputChar(MOVER_CHARS)

  if (direction === MOVER_CHARS.next) {
    textTokenizer.moveNext()
  } else if (direction === MOVER_CHARS.back) {
    textTokenizer.moveBack()
  } else {
    break
  }
} while (true)
