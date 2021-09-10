export class Token {
  constructor (type, value) {
    this.type = type
    this.value = value
  }

  hasMoreMatchedCharactersThan (otherValue) {
    return this.value.length > otherValue.length
  }
}
