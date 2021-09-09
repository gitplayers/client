import { images } from "../../Helpers";

class FloorObstacle {
    constructor(context, canvas){
        this.height = 32;
        this.width = 32;
        this.xVelocity = -10;
        this.context = context;
        this.canvas = canvas;
        this.x = this.canvas.width;
        this.y = this.canvas.height - this.height;
        this.sprite_image = new Image();
    }

    update(){
        this.x += this.xVelocity
    }

    display(){
        this.context.drawImage(this.sprite_image, this.x, this.y, this.width, this.height)
    }

    assignLocation(){
        this.x = this.canvas.width * 2
    }

}
export default FloorObstacle