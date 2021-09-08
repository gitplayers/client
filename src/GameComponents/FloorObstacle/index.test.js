import FloorObstacle from "./index";

describe ('floor obstacle functions', () => {

    let floorObstacle, canvas, context;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.height = "400px";
        context = canvas.getContext('2d');
        floorObstacle = new FloorObstacle(context, canvas);
    })


    test('update changes x velocity', () => { 
        floorObstacle.update();
        expect(floorObstacle.xVelocity).not.toBe(0);
    })


})