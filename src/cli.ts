import { Command } from '@commander-js/extra-typings'
import chalk from "chalk";
import clipboardy from "clipboardy";
import { PasswordManager } from './password-manager';
import path from 'node:path';
const log = console.log;

const program = new Command();

const version = "1.0.0";
program.version(version).description("Simple password generator");

program
    .option("-l, --length <number>", "length of password", "8")
    .option("-s, --save", "save password to passwords.txt")
    .option("-N, --no-numbers", "remove numbers")
    .option("-S, --no-symbols", "remove symbols")
    .parse();

const options: any = program.opts();
const { length, save, numbers, symbols } = options;

// Get generated password
const generatedPassword = PasswordManager.createPassword(length, numbers, symbols);

// Save to file
if (save) {
    const fullPath = path.join(process.cwd(), "passwords.txt");
    PasswordManager.savePassword(generatedPassword, fullPath);
}

// Copy to clipboard
clipboardy.writeSync(generatedPassword);

log(chalk.blue("Generated Password: ") + chalk.bold(generatedPassword));
log("----------------------------");
log(chalk.yellow("\nPassword copied to clipboard"));