import readlineSync from 'readline-sync'
import readline from 'readline'

export class ConsoleUI {
  constructor () {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  printWelcome () {
    console.log('Welcome to the Tokenizer!')
  }

  printActiveToken (token) {
    console.log(`--Active Token--\nType:\t${token.type}\nValue:\t${token.value}`)
  }

  clearConsole () {
    console.clear()
  }

  printStringBeingTokenized (string) {
    console.log(`String being tokenized: '${string}'`)
  }

  printIndex (index) {
    console.log(`Currently observing token[${index + 1}]`)
  }

  async getChosenGrammar () {
    const key = readlineSync.keyIn('Grammar to utilize:\n[1] word and dot (default)\n[2] arithmetic \n[3] maximal munch example\n')

    switch (key) {
      case '1':
        return 0
      case '2':
        return 1
      case '3':
        return 2
      default:
        return 0
    }
  }

  async getInputStringToTokenize () {
    return new Promise(resolve => this.rl.question('Please input string to tokenize: ', ans => {
      this.rl.close()
      resolve(ans)
    }))
  }

  getInputChar (MOVER_CHARS) {
    const key = readlineSync.keyIn(`\nPress [${MOVER_CHARS.back}] to go back, [${MOVER_CHARS.next}] to go forward. Any other key to quit...\n`)

    if (key !== MOVER_CHARS.back && key !== MOVER_CHARS.next) {
      return false
    }
    return key
  }
}
