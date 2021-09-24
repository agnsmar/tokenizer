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
    this.tokenizer = new Tokenizer(grammar.wordAndDot, string)
    this.navigateTokens(ui, string)
  }

  navigateTokens (ui, string) {
    do {
      ui.clearConsole()
      ui.printString(string)
      ui.printActiveToken(this.tokenizer.getActiveToken())
      ui.printIndex(this.tokenizer.activeTokenIndex)
      const direction = ui.getInputChar(this.MOVER_CHARS)

      if (direction === this.MOVER_CHARS.next) {
        this.tokenizer.moveNext()
      } else if (direction === this.MOVER_CHARS.back) {
        this.tokenizer.moveBack()
      } else {
        break
      }
    } while (true)
  }
}
