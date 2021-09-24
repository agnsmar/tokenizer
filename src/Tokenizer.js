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
      const types = this.grammar
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
      const exceptionToken = this.createExceptionToken()
      this.addTokenToCollection(exceptionToken)
      throw new Error(`${this.EXCEPTION_MESSAGE} '${this.string}'`)
    } else {
      const token = this._getTokenWithMostCharacters(matchedTokens)
      this.addTokenToCollection(token)
      this._removeValueFromString(token.value)
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

  _getTokenWithMostCharacters (tokens) {
    let tokenWithMostMatchedCharacters = tokens[0]

    tokens.forEach(token => {
      if (token.hasMoreMatchedCharactersThan(tokenWithMostMatchedCharacters)) {
        tokenWithMostMatchedCharacters = token
      }
    })
    return tokenWithMostMatchedCharacters
  }

  createExceptionToken () {
    return new Token('Exception', `${this.EXCEPTION_MESSAGE} '${this.string}'`)
  }

  _removeValueFromString (tokenValueToRemove) {
    this.string = this.string.replace(tokenValueToRemove, '')
  }

  /**
   * Returns resulting array of Tokens from the tokenized input string.
   *
   * @return {Token[]} Array of Tokens.
   * @memberof Tokenizer
   */
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

  /**
   * Returns the active token.
   *
   * @return {Token} The active token.
   * @memberof Tokenizer
   */
  getActiveToken () {
    return this.tokens[this.activeTokenIndex]
  }

  /**
   * Move active token forward by amount of steps specified in argument,
   * if no argument is provided this will default to 1 step.
   *
   * @param {number} [steps=1] - Steps to move, defaults to 1 if not provided.
   * @memberof Tokenizer
   */
  moveNext (steps = 1) {
    for (let step = 0; step < steps; step++) {
      if (this.activeTokenIndex < this.tokens.length - 1) {
        this.activeTokenIndex++
      }
    }
  }

  /**
   * Move active token backwards by amount of steps specified in argument,
   * if no argument is provided this will default to 1 step.
   *
   * @param {number} [steps=1] - Steps to move, defaults to 1 if not provided.
   * @memberof Tokenizer
   */
  moveBack (steps = 1) {
    for (let step = 0; step < steps; step++) {
      if (this.activeTokenIndex > 0) {
        this.activeTokenIndex--
      }
    }
  }
}
