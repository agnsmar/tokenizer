export class Tokenizer {
  constructor (grammar, sentence) {
    this.grammar = grammar
    this.sentence = sentence
  }

  showTokens () {
    return ['Meningen', 'består', 'av', 'ord', '.']
  }
}
