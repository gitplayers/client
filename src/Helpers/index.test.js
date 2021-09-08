import { shuffle, decideErrorMessage } from "./index.js";

describe ('shuffle check', () => {
    test('it should be a function', () => {
        expect(shuffle).toBeDefined();
    })

    test('should return shuffled array', () => {
        let array = [1, 2, 3, 4];
        expect(shuffle(array)).toHaveLength(4);
    })


})

describe ('error decider check', () => {
    test('it should be a function', () => {
        expect(decideErrorMessage).toBeDefined();
    })

    test('should return an error message string on 404', () => {
        expect(decideErrorMessage(404)).toBe("It looks like we couldn't find that wedding name... The link may have expired, or maybe there is a typo in the link name.")
    })

    test('should return an error message string on 500', () => {
        expect(decideErrorMessage(500)).toBe("It looks like there's been an error with the server... Wait a while and refresh to try again.")
    })

    test('should return an error message string on other code', () => {
        expect(decideErrorMessage(401)).toBe("There's been an error...")
    })

})