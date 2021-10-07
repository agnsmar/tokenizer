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
    this._startTokenization()
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
   * Moves active token forward by amount of steps specified in argument,
   * if no argument is provided this will default to 1 step.
   *
   * In case of attempting to move beyond last token in list,
   * active token pointer will not move and remains on final token of the list.
   *
   * @param {number} [steps=1] - Steps to move, defaults to 1 if not provided.
   * @memberof Tokenizer
   */
  moveNext (steps = 1) {
    for (let step = 0; step < steps; step++) {
      if (this._isOnLastToken()) {
        break
      } else {
        this.activeTokenIndex++
      }
    }
  }

  /**
   * Moves active token backwards by amount of steps specified in argument,
   * if no argument is provided this will default to 1 step.
   *
   * In case of attempting to move further back than first token in
   * list, active token pointer will not move and remains on position 1 (index 0).
   *
   * @param {number} [steps=1] - Steps to move, defaults to 1 if not provided.
   * @memberof Tokenizer
   */
  moveBack (steps = 1) {
    for (let step = 0; step < steps; step++) {
      if (this._isOnFirstToken()) {
        break
      } else {
        this.activeTokenIndex--
      }
    }
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

  _startTokenization () {
    while (this.string.length > 0) {
      const matchedTokens = this._matchStringToAllKnownTokenTypes(this.grammar)

      if (this._thereAreNoMatchedTokens(matchedTokens)) {
        const exceptionToken = this._createExceptionToken()
        this._addTokenToCollection(exceptionToken)
        break
      }

      const token = this._getTokenWithMostCharacters(matchedTokens)
      this._addTokenToCollection(token)
      this._removeValueFromString(token.value)
      this._trimString()
    }
    this._addTokenToCollection(this.endToken)
  }

  _matchStringToAllKnownTokenTypes (types) {
    const matchedTokens = []
    types.forEach(type => {
      const tokenValue = this._matchStringAgainstRegex(type.regex)
      if (tokenValue) {
        const token = new Token(type.name, tokenValue)
        matchedTokens.push(token)
      }
    })
    return matchedTokens
  }

  _thereAreNoMatchedTokens (tokens) {
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

  _createExceptionToken () {
    return new Token('Exception', `${this.EXCEPTION_MESSAGE} '${this.string}'`)
  }

  _removeValueFromString (tokenValueToRemove) {
    this.string = this.string.replace(tokenValueToRemove, '')
  }

  _trimString () {
    this.string = this.string.trim()
  }

  _matchStringAgainstRegex (regex) {
    let token = this.string.match(regex)
    if (token) {
      token = token[0]
    }
    return token
  }

  _addTokenToCollection (token) {
    this.tokens.push(token)
  }

  _isOnLastToken () {
    return this.activeTokenIndex >= this.tokens.length - 1
  }

  _isOnFirstToken () {
    return this.activeTokenIndex <= 0
  }
}
