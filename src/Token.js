export class Token {
  constructor (type, value) {
    this.type = type
    this.value = value
  }

  hasMoreMatchedCharactersThan (otherToken) {
    return this.value.length > otherToken.value.length
  }
}
