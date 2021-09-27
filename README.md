# Tokenizer
A tool for performing lexical analysis of strings. Utilizes user-specified rules to deconstruct the provided string into smaller parts (tokens)
# Usage

### `Tokenizer(grammar[], string)`
When a tokenizer is instantiated, a `grammar` and a `string` must be provided in the constructor.


The provided `grammar` is an array consisting of objects representing token-types. Token-type objects have a `name` and a regular expression (`regex`)

#### Example grammar
```js
// Example grammar
const wordAndDot = [
  { name: 'WORD', regex: /^[a-zA-Z|åäöÅÄÖ]+/ },
  { name: 'DOT', regex: /^\./ }
]
```

#### Example of tokenizer instatiation
```js
const tokenizer = new Tokenizer(wordAndDot, 'Meningen består av ord.')

console.log(tokenizer.getActiveToken())
```
Result: `{ type: 'WORD', value: 'Meningen' }`

# Regex Syntax

In order to function as intended, the provided regex **must** begin with the 'start of string'-anchor `^`. Remaining rules of the pattern are left  to the user.
#### Examples of some functioning tokentypes
```js
[{ name: 'WORD', regex: /^[a-zA-Z|åäöÅÄÖ]+/ },      // Words
 { name: 'DOT', regex: /^\./ },                     // Dots
 { name: 'NUMBER', regex: /^[0-9]+(\.([0-9])+)?/ }, // Numbers
 { name: 'ADD', regex: /^[+]/ },                    // Addition symbol
 { name: 'MUL', regex: /^[*]/ },                    // Multiplication symbol
 { name: 'SUB', regex: /^[-]/ },                    // Subtraction symbol
 { name: 'DIV', regex: /^[/]/ },                    // Division symbol
 { name: 'OPENPAR', regex: /^[(]/ },                // Opening Parenthesis
 { name: 'CLOSEPAR', regex: /^[)]/ },               // Colsing Parenthesis
 { name: 'FLOAT', regex: /^[0-9]+\.[0-9]+/ },       // Floats
 { name: 'INTEGER', regex: /^[0-9]+/ }]             // Integers
```
# Exceptions

In the case of the tokenizer encountering a portion of the provided string that cannot be categorized into one of the known tokentypes, the tokenization of the string will cease and an `Exception-token` is appended to the end of the token-list.

#### Example
```js
// Using the example grammar Word and Dot from earlier.
const tokenizer = new Tokenizer(wordAndDot, 'I want 30 pizzas.')

tokenizer.moveNext(2)
console.log(tokenizer.getActiveToken())
```
Result: `{ type: 'Exception', value: 'No lexical element matches '30 pizzas.'' }`
# API

### getTokens()

Returns an array of tokens from tokenization of the input string.

#### Example
```js
// Using the example grammar Word and Dot from earlier.
const tokenizer = new Tokenizer(wordAndDot, 'Hello there.')

tokenizer.getTokens()
```
Returns: `[{ type: 'WORD', value: 'Hello' }, { type: 'WORD', value: 'there' }, { type: 'WORD', value: '.' }, { type: 'END', value: null }]`

### getActiveToken()

Returns the token that is currently 'active' in the collection of tokens. Defaults to the first token in the list, navigable with the moveNext() & moveBack() methods.

#### Example
```js
// Using the example grammar Word and Dot from earlier.
const tokenizer = new Tokenizer(wordAndDot, 'General Kenobi.')

tokenizer.getActiveToken()
```
Returns: `{ type: 'WORD', value: 'General' }`

### moveNext()

Moves the 'active token' pointer forward in the token-collection. 
Does not return any token on its own, only changes what token is currently 'active'

Amount of steps to move can be specified in argument. If left unspecified, this will default to 1 step.

#### Examples
#### Moving 1 step forwards
```js
// Using the example grammar Word and Dot from earlier.
const tokenizer = new Tokenizer(wordAndDot, 'Your clones are very impressive.')

tokenizer.moveNext() // Move 1 step forward

tokenizer.getActiveToken() // Get the token to present result
```
Result: `{ type: 'WORD', value: 'clones' }`

#### Moving several steps forward at once
```js
// Continuing from above example...
tokenizer.moveNext(4) // Moving 4 steps at once.

tokenizer.getActiveToken() // Get the token to present result
```
Result: `{ type: 'DOT', value: '.' }`

#### Moving to end of collection
```js
// Continuing from above example...
tokenizer.moveNext()

tokenizer.getActiveToken() // Get the token to present result
```
Result: `{ type: 'END', value: null }`

#### Moving beyond the end of the list.
```js
// Continuing from above example...
tokenizer.moveNext()

tokenizer.getActiveToken() // Get the token to present result
```
Result: `{ type: 'END', value: null }`

Moving beyond the end of the array is not allowed and results in the active-token pointer remaining on the token positioned last in the list.

### moveBack()

Moves the 'active token' pointer backwards in the token-collection. Does not return any token on its own, only changes what token is currently 'active'

Amount of steps to move can be specified in argument. If left unspecified, this will default to 1 step.

#### Examples
#### Moving 1 step backwards
```js
// Using the example grammar Word and Dot from earlier.
const tokenizer = new Tokenizer(wordAndDot, 'You must be very proud.')

tokenizer.moveNext(6) // Moving to the end of the list, active token is { type: 'END', value: null }

tokenizer moveBack() // Moving back 1 step

tokenizer.getActiveToken() // Get the token to present result
```
Result: `{ type: 'DOT', value: '.' }`

#### Moving several steps backwards at once
```js
// Continuing from above example...
tokenizer.moveBack(5) // Moving 5 steps at once.

tokenizer.getActiveToken() // Get the token to present result
```
Result: `{ type: 'WORD', value: 'You' }`


#### Moving further back than the beginning of the list
```js
// Continuing from above example...
tokenizer.moveBack()

tokenizer.getActiveToken() // Get the token to present result
```
Result: `{ type: 'Word', value: You }`

Moving further back than the beginning of the array is not allowed and results in the active-token pointer remaining on the token positioned first in the list.
