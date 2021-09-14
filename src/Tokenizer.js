import { Token } from './Token.js'

export class Tokenizer {
  constructor (grammar, string) {
    this.grammar = grammar
    this.string = string
    this.tokens = []
  }

  tokenize () {
    try {
      const types = this.grammar.getTokenTypes()
      while (this.string.length > 0) {
        const matchedTokens = []
        for (let i = 0; i < types.length; i++) {
          const type = types[i]
          this.trimString()
          const tokenValue = this.matchTokenToRegex(type.regex)
          if (tokenValue) {
            const token = new Token(type.name, tokenValue)
            matchedTokens.push(token)
          }
        }

        if (matchedTokens.length === 1) {
          this.addTokenToCollection(matchedTokens[0])
          this.string = this.string.replace(matchedTokens[0].value, '')
        } else if (matchedTokens.length > 1) {
          let tokenWithMostMatchedCharacters = matchedTokens[0]
          for (let i = 1; i < matchedTokens.length; i++) {
            const currentToken = matchedTokens[i]
            if (currentToken.hasMoreMatchedCharactersThan(tokenWithMostMatchedCharacters)) {
              tokenWithMostMatchedCharacters = currentToken
            }
          }
        }
        if (matchedTokens.length === 0) {
          throw new Error(`No lexical element matches ${this.string}`)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  getTokens () {
    return this.tokens
  }

  trimString () {
    this.string = this.string.trim()
  }

  matchTokenToRegex (regex) {
    let token = this.string.match(regex)
    if (token) {
      token = token[0]
    }
    return token
  }

  addTokenToCollection (token) {
    this.tokens.push(token)
  }
}
