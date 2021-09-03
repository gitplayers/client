class Obstacle {
    constructor(context, canvas){
        this.height = 20;
        this.width = 20;
        this.xVelocity = -10;
        this.context = context;
        this.canvas = canvas;
        this.x = this.canvas.width;
        this.y = this.canvas.height - this.height;
    }

    update(){
        this.x += this.xVelocity
        if (this.x < -this.width){
            this.x = this.canvas.width + Math.floor(Math.random()*this.width*2.5)
        }
    }

    display(){
    
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

}
export default Obstacle