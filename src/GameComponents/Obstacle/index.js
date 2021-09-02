class Obstacle {
    constructor(context){
        this.x = 400;
        this.y = 130;
        this.height = 20;
        this.width = 20;
        this.xVelocity = -10;
        this.context = context
    }

    update(){
        this.x += this.xVelocity
        if (this.x < -20){
            this.x = 400+ Math.random()*20
        }
    }

    display(){
    
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

}
export default Obstacle