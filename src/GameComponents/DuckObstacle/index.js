class DuckObstacle {
    constructor(context, canvas){
        this.height = 32;
        this.width = 32;
        this.xVelocity = -10;
        this.context = context;
        this.canvas = canvas;
        this.x = this.canvas.width * 2;
        this.y = this.canvas.height - this.height*1.9;
        this.sprite_image = new Image()
    }

    update(){
        this.x += this.xVelocity
        if (this.x < -this.width){
            this.x = this.canvas.width * 2
        }
    }


    //if position x of other obstacle is within canvas width, wait, else reset

    display(){
        // this.sprite_image.src = ""
        // this.context.drawImage(this.sprite_image, this.width, this.height, 20, this.y, this.width, this.height)
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

}
export default DuckObstacle;