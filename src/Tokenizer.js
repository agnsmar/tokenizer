import { Token } from './Token.js'

export class Tokenizer {
  constructor (grammar, string) {
    this.grammar = grammar
    this.string = string
    this.tokens = []
    this.activeTokenIndex = 0
    this.endToken = new Token('END', null)
    this.EXCEPTION_MESSAGE = 'No lexical element matches'

    this._trimString()
    this._tokenize()
  }

  _tokenize () {
    try {
      const types = this.grammar.getTokenTypes()
      while (this.string.length > 0) {
        const matchedTokens = this.matchStringToAllKnownTypes(types)

        this.determineMatchedTokenCountAndAddLongestTokenToCollection(matchedTokens)
        this._trimString()
      }
      this.addTokenToCollection(this.endToken)
    } catch (error) {

    }
  }

  determineMatchedTokenCountAndAddLongestTokenToCollection (matchedTokens) {
    if (this.thereAreNoMatchedTokens(matchedTokens)) {
      this.createAndAddExceptionToken()
      throw new Error(`${this.EXCEPTION_MESSAGE} '${this.string}'`)
    } else {
      this.addLongestTokenToCollection(matchedTokens)
    }
  }

  matchStringToAllKnownTypes (types) {
    const matchedTokens = []
    types.forEach(type => {
      const tokenValue = this.matchTokenToRegex(type.regex)
      if (tokenValue) {
        const token = new Token(type.name, tokenValue)
        matchedTokens.push(token)
      }
    })

    return matchedTokens
  }

  thereAreNoMatchedTokens (tokens) {
    return tokens.length === 0
  }

  addLongestTokenToCollection (tokens) {
    let tokenWithMostMatchedCharacters = tokens[0]

    tokens.forEach(token => {
      if (token.hasMoreMatchedCharactersThan(tokenWithMostMatchedCharacters)) {
        tokenWithMostMatchedCharacters = token
      }
    })

    this.addTokenToCollection(tokenWithMostMatchedCharacters)
    this._removeValueFromString(tokenWithMostMatchedCharacters.value)
  }

  createAndAddExceptionToken () {
    const exceptionToken = new Token('Exception', `${this.EXCEPTION_MESSAGE} '${this.string}'`)
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
    for (let step = 0; step < steps; step++) {
      if (this.activeTokenIndex < this.tokens.length - 1) {
        this.activeTokenIndex++
      }
    }
  }

  moveBack (steps = 1) {
    for (let step = 0; step < steps; step++) {
      if (this.activeTokenIndex > 0) {
        this.activeTokenIndex--
      }
    }
  }
}
