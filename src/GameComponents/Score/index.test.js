import Scoreboard from "./index";

describe ('floor obstacle functions', () => {

    let scoreboard, canvas, context;
    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.height = "400px";
        context = canvas.getContext('2d');
        scoreboard = new Scoreboard(context, canvas);
    })

    test('update changes score', () => {
        scoreboard.update();
        expect(scoreboard.score).not.toBe(0);
    })

})