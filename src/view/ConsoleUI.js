import readline from 'readline-sync'

export class ConsoleUI {
  printWelcome () {
    console.log('Welcome to the Tokenizer lmao')
  }

  printActiveToken (token) {
    console.clear()
    console.log(`Active Token:\nType:\t${token.type}\nValue:\t${token.value}`)
  }

  printIndex (index) {
    console.log(`Currently observing token[${index + 1}]`)
  }

  getInputChar (MOVER_CHARS) {
    const key = readline.keyIn(`\nPress [${MOVER_CHARS.back}] to go back, [${MOVER_CHARS.next}] to go forward. Any other key to quit...\n`)

    if (key !== MOVER_CHARS.back && key !== MOVER_CHARS.next) {
      return false
    }
    return key
  }
}
