import DuckObstacle from "./index";

describe ('duck obstacle functions', () => {

    let duckObstacle, canvas, context;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.height = "400px"
        context = canvas.getContext('2d');
        duckObstacle =  new DuckObstacle(context, canvas); 
    })


    test('update changes x velocity', () => {
        duckObstacle.update();
        expect(duckObstacle.xVelocity).not.toBe(0);
    })


})