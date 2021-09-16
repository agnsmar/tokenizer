import { Token } from './Token.js'

export class Tokenizer {
  constructor (grammar, string) {
    this.grammar = grammar
    this.string = string
    this.tokens = []
    this.endToken = new Token('END', null)
    this.activeTokenIndex = 0

    this._tokenize()
  }

  _tokenize () {
    try {
      this._trimString()
      const types = this.grammar.getTokenTypes()
      while (this.string.length > 0) {
        const matchedTokens = []
        for (let i = 0; i < types.length; i++) {
          const type = types[i]
          this._trimString()
          const tokenValue = this.matchTokenToRegex(type.regex)
          if (tokenValue) {
            const token = new Token(type.name, tokenValue)
            matchedTokens.push(token)
          }
        }

        if (matchedTokens.length === 1) {
          this.thereIsOneMatchedToken(matchedTokens[0])
        } else if (matchedTokens.length > 1) {
          this.thereAreManyMatchedTokens(matchedTokens)
        }
        if (matchedTokens.length === 0) {
          this.thereAreNoMatchedTokens()
          throw new Error(`No lexical element matches '${this.string}'`)
        }
      }
      this.addTokenToCollection(this.endToken)
    } catch (error) {

    }
  }

  thereIsOneMatchedToken (token) {
    this.addTokenToCollection(token)
    this._removeValueFromString(token.value)
  }

  thereAreManyMatchedTokens (tokens) {
    let tokenWithMostMatchedCharacters = tokens[0]
    for (let i = 1; i < tokens.length; i++) {
      const currentToken = tokens[i]
      if (currentToken.hasMoreMatchedCharactersThan(tokenWithMostMatchedCharacters)) {
        tokenWithMostMatchedCharacters = currentToken
      }
    }
    this.addTokenToCollection(tokenWithMostMatchedCharacters)
    this._removeValueFromString(tokenWithMostMatchedCharacters.value)
  }

  thereAreNoMatchedTokens () {
    const exceptionToken = new Token('Exception', `No lexical element matches '${this.string}'`)
    this.addTokenToCollection(exceptionToken)
  }

  _removeValueFromString (tokenValueToRemove) {
    this.string = this.string.replace(tokenValueToRemove, '')
  }

  getTokens () {
    return this.tokens
  }

  _trimString () {
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

  getActiveToken () {
    return this.tokens[this.activeTokenIndex]
  }

  moveNext (steps = 1) {
    // Will require more complex routing
    for (let step = 0; step < steps; step++) {
      this.activeTokenIndex++
    }
  }

  moveBack (steps = 1) {
    // Will require more complex routing
    for (let step = 0; step < steps; step++) {
      this.activeTokenIndex--
    }
  }
}
