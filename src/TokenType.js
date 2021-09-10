export class TokenType {
  constructor (name, regex) {
    this.name = name
    this.regex = regex
  }

  getName () {
    return this.name
  }

  getRegex () {
    return this.regex
  }
}
