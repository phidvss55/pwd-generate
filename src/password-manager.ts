import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";

export class PasswordManager {
    private static alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static numbers = "0123456789";
    private static symbols = "!@#$%^&*_-+=";

    /**
     * 
     * @param length 
     * @param hasNumbers 
     * @param hasSymbols 
     * @returns 
     */
    static createPassword(length = 8, hasNumbers = true, hasSymbols = true) {
        let chars = this.alpha;

        if (hasNumbers) {
            chars += this.numbers;
        }

        if (hasSymbols) {
            chars += this.symbols;
        }

        return this.generatePassword(length, chars);
    }

    /**
     * 
     * @param length 
     * @param chars 
     * @returns 
     */
    static generatePassword(length: number, chars: string) {
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    /**
     * Saves the password to a file.
     * @param {string} password The password to save.
     * @returns {Promise<void>}
     */
    static savePassword = async (password: string, filePath: string) => {
        try {
            await fs.promises.appendFile(filePath, password + os.EOL, "utf-8");
            console.log("----------------------------");
            console.log(chalk.green("Password saved to: " + filePath));
        } catch (error) {
            console.error(chalk.red("Error saving password:"), error);
        }
    };
}
