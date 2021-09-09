export class Tokenizer {
  constructor (grammar, string) {
    this.grammar = grammar
    this.string = string
    this.tokens = []
  }

  tokenize () {
    const regex = this.grammar.getGrammar()

    for (let i = 0; i < 4; i++) {
      this.trimString()
      const token = this.matchTokenToRegex(regex)
      this.addTokenToCollection(token)
      this.string = this.string.replace(token, '')
    }
  }

  getTokens () {
    return this.tokens
  }

  trimString () {
    this.string = this.string.trim()
  }

  matchTokenToRegex (regex) {
    const token = this.string.match(regex)[0]
    return token
  }

  addTokenToCollection (token) {
    this.tokens.push(token)
  }
}
