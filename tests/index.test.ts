import fs from 'fs'
import { createPassword, savePassword } from '../src/index'
import path from 'node:path'
import os from 'node:os'

describe('Package Export', () => {
    it('should export createPassword function directly', () => {
        expect(typeof createPassword).toBe('function');
    });

    it('should generate password using the exported function', () => {
        const password = createPassword(10);
        expect(password.length).toBe(10);
    });

    it('should respect arguments passed to exported function', () => {
        const password = createPassword(15, false, false);
        expect(password.length).toBe(15);
        expect(/[0-9!@#$%^&*_\-+=]/.test(password)).toBe(false);
    });
});

jest.mock("fs", () => ({
    promises: {
        appendFile: jest.fn().mockResolvedValue(undefined),
    },
}));

describe('Save password', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should save password to file', async () => {
        const password = createPassword(10, true, true);
        expect(password.length).toBe(10);
        await savePassword(password, 'passwords.txt');
    })

    test("should append password to file in current working directory", async () => {
        const password = "mySecretPassword";
        const expectedPath = path.join(process.cwd(), "password.txt");

        savePassword(password, expectedPath);

        const expectedContent = password + os.EOL;

        expect(fs.promises.appendFile).toHaveBeenCalledTimes(1);
        expect(fs.promises.appendFile).toHaveBeenCalledWith(
            expectedPath,
            expectedContent,
            "utf-8"
        );
    });

    test("should handle errors gracefully", async () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });
        // fs.appendFile.mockRejectedValueOnce(new Error("Write error"));
        (fs.promises.appendFile as jest.Mock).mockImplementationOnce(() => {
            throw new Error("Write error");
        });

        await savePassword("failPass", "passwords.txt");

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
})
