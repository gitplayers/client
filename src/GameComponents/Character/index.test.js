import Animation from "./animation";
import Character from "./index";

describe ('update frame check', () => {

    const animation = new Animation;

    test('it should be a function', () => {
        expect(animation.update_frame).toBeDefined();
    })

    test('should increase this.count by 1', () => {
        animation.update_frame()
        expect(animation.count).toBe(1);
    })


})

describe ('update frame_set check', () => {

    let frame_set = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    ]
    const animation = new Animation(1, frame_set);

    test('it should be a function', () => {
        expect(animation.update_frame_set).toBeDefined();
    })

    test('different frame_set resets count', () => {
        let otherFrameSet = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13]]
        animation.update_frame()
        animation.update_frame_set(otherFrameSet)
        expect(animation.count).toBe(0);
    })
})

describe ('character functions', () => {

    let character, canvas, context;
    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.height = 400;
        context = canvas.getContext('2d');
        character = new Character(context, canvas);
    })

    test('character update increases y position by y velocity', () => {
        character.yVelocity = 10
        let initialY = character.y;
        character.update();
        expect(character.y).toBe(initialY + 10);
    })

    test('update vertical movement functions based on space press', () => { 
        character.verticalMovement('Space');
        expect(character.yVelocity).not.toBe(0);
    })

    test('update vertical movement functions based on space press', () => {
        character.verticalMovement('Down');
        expect(character.duckVelocity).not.toBe(0);
    })


})