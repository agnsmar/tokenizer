import { Tokenizer } from '../../src/Tokenizer.js'
import { ConsoleUI } from '../view/ConsoleUI.js'
import * as grammar from '../exampleGrammars.js'

const textTokenizer = new Tokenizer(grammar.wordAndDot, 'Meningen består av ord. 123 test test')

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
