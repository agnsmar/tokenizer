export class Grammar {
  constructor () {
    this.tokenTypes = []
  }

  getTokenTypes () {
    return this.tokenTypes
  }

  addTokenType (token) {
    this.tokenTypes.push(token)
  }
}
