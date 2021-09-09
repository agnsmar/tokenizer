export class Grammar {
  constructor (regex) {
    this.token = regex
  }

  getGrammar () {
    return this.token
  }
}
