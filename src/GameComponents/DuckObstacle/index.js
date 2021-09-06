class DuckObstacle {
    constructor(context, canvas){
        this.height = 20;
        this.width = 20;
        this.xVelocity = -10;
        this.context = context;
        this.canvas = canvas;
        this.x = this.canvas.width * 2;
        this.y = this.canvas.height - this.height*1.9;
    }

    update(){
        this.x += this.xVelocity
        if (this.x < -this.width){
            this.x = this.canvas.width * 2 + Math.floor(Math.random()*this.width*2.5)
        }
    }


    //if position x of other obstacle is within canvas width, wait, else reset

    display(){
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

}
export default DuckObstacle;