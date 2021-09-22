// Word and Dot grammar.
export const wordAndDot = [
  { name: 'WORD', regex: /^[a-zA-Z|åäöÅÄÖ]+/ },
  { name: 'DOT', regex: /^\./ }
]

// Arithmetic Grammar.
export const arithmetic = [
  { name: 'NUMBER', regex: /^[0-9]+(\.([0-9])+)?/ },
  { name: 'ADD', regex: /^[+]/ },
  { name: 'MUL', regex: /^[*]/ },
  { name: 'SUB', regex: /^[-]/ },
  { name: 'DIV', regex: /^[/]/ },
  { name: 'OPENPAR', regex: /^[(]/ },
  { name: 'CLOSEPAR', regex: /^[)]/ }
]

// Maximal Munch Tester Grammar.
export const maximalMunchTester = [
  { name: 'FLOAT', regex: /^[0-9]+\.[0-9]+/ },
  { name: 'INTEGER', regex: /^[0-9]+/ }
]
