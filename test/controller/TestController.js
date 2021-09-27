import { Tokenizer } from '../../src/Tokenizer.js'
import * as grammar from '../exampleGrammars.js'

export class TestController {
  constructor () {
    this.MOVER_CHARS = {
      next: '>',
      back: '<'
    }

    this.grammars = [
      grammar.wordAndDot,
      grammar.arithmetic,
      grammar.maximalMunchTester
    ]
  }

  async start (ui) {
    ui.printWelcome()
    const string = await ui.getInputStringToTokenize()
    const chosenGrammar = await ui.getChosenGrammar()

    this.tokenizer = new Tokenizer(this.grammars[chosenGrammar], string)
    this.navigateTokens(ui, string)
  }

  navigateTokens (ui, string) {
    let done = false
    do {
      ui.clearConsole()
      ui.printStringBeingTokenized(string)
      ui.printActiveToken(this.tokenizer.getActiveToken())
      ui.printIndex(this.tokenizer.activeTokenIndex)

      const direction = ui.getInputChar(this.MOVER_CHARS)
      switch (direction) {
        case this.MOVER_CHARS.next:
          this.tokenizer.moveNext()
          break
        case this.MOVER_CHARS.back:
          this.tokenizer.moveBack()
          break
        default:
          done = true
      }
    } while (!done)
  }
}
