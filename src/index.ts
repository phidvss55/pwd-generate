import { PasswordManager } from './password-manager';

const createPassword = PasswordManager.createPassword.bind(PasswordManager);
const savePassword = PasswordManager.savePassword.bind(PasswordManager);

export {
    createPassword,
    savePassword
}