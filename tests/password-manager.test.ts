import { PasswordManager } from '../src/password-manager';

describe('PasswordManager', () => {
    describe('createPassword', () => {
        it('should generate a password with default length 8', () => {
            const password = PasswordManager.createPassword();
            expect(password.length).toBe(8);
        });

        it('should generate a password with custom length', () => {
            const password = PasswordManager.createPassword(12);
            expect(password.length).toBe(12);
        });

        it('should contain numbers if hasNumbers is true', () => {
            // Run multiple times to ensure randomness doesn't fluke a pass/fail
            let seenNumber = false;
            for (let i = 0; i < 50; i++) {
                const password = PasswordManager.createPassword(20, true, false);
                if (/[0-9]/.test(password)) {
                    seenNumber = true;
                    break;
                }
            }
            expect(seenNumber).toBe(true);
        });

        it('should not contain numbers if hasNumbers is false', () => {
            const password = PasswordManager.createPassword(50, false, false);
            expect(/[0-9]/.test(password)).toBe(false);
        });

        it('should contain symbols if hasSymbols is true', () => {
            let seenSymbol = false;
            // Symbols defined in PasswordManager: !@#$%^&*_-+=
            const symbolRegex = /[!@#$%^&*_\-+=]/;
            for (let i = 0; i < 50; i++) {
                const password = PasswordManager.createPassword(20, false, true);
                if (symbolRegex.test(password)) {
                    seenSymbol = true;
                    break;
                }
            }
            expect(seenSymbol).toBe(true);
        });

        it('should not contain symbols if hasSymbols is false', () => {
            const symbolRegex = /[!@#$%^&*_\-+=]/;
            const password = PasswordManager.createPassword(50, false, false);
            expect(symbolRegex.test(password)).toBe(false);
        });

        it('should work with both numbers and symbols enabled', () => {
            const password = PasswordManager.createPassword(20, true, true);
            expect(password.length).toBe(20);
        });
    });
});
