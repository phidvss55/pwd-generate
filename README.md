# Password Generator CLI

A simple, powerful, and customizable command-line interface (CLI) tool for generating secure passwords. Built with Node.js.

## Features

- **Customizable Length**: specific the length of password you want to generate.
- **Numbers & Symbols**: option to include or exclude numbers and symbols.
- **Save to File**: automatically append generated passwords to a `password.txt` file.
- **Clipboard Support**: generated password is automatically copied to your clipboard.

## Installation

Ensure you have Node.js installed. Then, install the package globally via npm:

```bash
npm install -g @phidvss55/password-generate
```

## Usage

Run the tool from your terminal:

```bash
password-generate [options]
```

### Options

| Option | Alias | Description | Default |
| :--- | :--- | :--- | :--- |
| `--length <number>` | `-l` | Length of the password | `8` |
| `--save` | `-s` | Save password to `password.txt` | `false` |
| `--no-numbers` | `-nn` | Remove numbers from password | `false` |
| `--no-symbols` | `-ns` | Remove symbols from password | `false` |
| `--version` | `-V` | Output the version number | |
| `--help` | `-h` | Display help for command | |

## Examples

Generate a default 8-character password:
```bash
password-generate
```

Generate a 20-character password:
```bash
password-generate -l 20
```

Generate a password with no symbols and save it to file:
```bash
password-generate -ns --save
```

Generate a 10-character password with letters only (no numbers, no symbols):
```bash
password-generate -l 10 -nn -ns
```

## Programmatic Usage

You can also use this package in your own Node.js projects.

```javascript
const createPassword = require('@phidvss55/password-generate');

// Generate a default 8-character password with numbers and symbols
const password = createPassword();
console.log(password); // e.g., "aB3$eR9@"

// Generate a customized password
// createPassword(length, hasNumbers, hasSymbols)
const customPassword = createPassword(20, false, false); 
console.log(customPassword); // e.g., "abcdefGHIJKLmnOPqrst"
```