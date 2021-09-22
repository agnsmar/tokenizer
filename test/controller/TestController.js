import { Tokenizer } from '../../src/Tokenizer.js'
import * as grammar from '../exampleGrammars.js'

export class TestController {
  constructor () {
    this.MOVER_CHARS = {
      next: '>',
      back: '<'
    }
  }

  async start (ui) {
    ui.printWelcome()
    const string = await ui.getInputStringToTokenize()
    const tokenizer = new Tokenizer(grammar.wordAndDot, string)
    this.doBusiness(ui, tokenizer, string)
  }

  doBusiness (ui, tokenizer, string) {
    do {
      ui.clearConsole()
      ui.printString(string)
      ui.printActiveToken(tokenizer.getActiveToken())
      ui.printIndex(tokenizer.activeTokenIndex)
      const direction = ui.getInputChar(this.MOVER_CHARS)

      if (direction === this.MOVER_CHARS.next) {
        tokenizer.moveNext()
      } else if (direction === this.MOVER_CHARS.back) {
        tokenizer.moveBack()
      } else {
        break
      }
    } while (true)
  }
}
