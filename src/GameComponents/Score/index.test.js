import Scoreboard from "./index";

describe ('floor obstacle functions', () => {

    let scoreboard, canvas, context;
    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.height = "400px"
        context = canvas.getContext('2d');
        scoreboard =  new Scoreboard(context, canvas);    
    })

    // test('changes score position on score reaching certain values', () => {
    //     let originalX = scoreboard.x;
    //     scoreboard.score = 90 
    //     scoreboard.display(1.1)
    //     expect(scoreboard.x).not.toBe(originalX)   
    // })

    test('update changes score', () => {

        scoreboard.update();
        expect(scoreboard.score).not.toBe(0);
    })


})