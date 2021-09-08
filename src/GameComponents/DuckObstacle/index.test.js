import DuckObstacle from "./index";

describe ('duck obstacle functions', () => {


    test('update changes x velocity', () => {
        let canvas = document.createElement('canvas');
        canvas.height = "400px"
        let context = canvas.getContext('2d');
        let duckObstacle =  new DuckObstacle(context, canvas);    
        duckObstacle.update();
        expect(duckObstacle.xVelocity).not.toBe(0);
    })


})