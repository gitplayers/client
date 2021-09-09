import  Animation from './animation';

class Character {
    constructor(context, canvas){
        this.jumpSpeed = 10;
        this.duckSpeed = 2;
        this.height = 33;
        this.width = 32;
        this.duckHeight = 32;
        this.minDuck = 26;
        this.yVelocity = 0;
        this.duckVelocity = 0;
        this.duckFrames = 0;
        this.maxDuckFrames = 8;
        this.context = context;
        this.canvas = canvas;
        this.x = this.width;
        this.y = this.canvas.height - this.height;
        this.duckY = this.canvas.height - this.duckHeight;
        this.frame_set =[
            [0, 1, 2, 3, 4, 5, 6, 7],
            [0, 1, 2, 3, 4, 5, 6, 7, 8],
            [0, 1, 2, 3, 4, 5, 6, 7]                     
        ]
        this.sprite_image = new Image()
        this.anim = new Animation(4, this.frame_set[0])
    }

    update(){
        
        this.y += this.yVelocity
        if (this.y < this.canvas.height - (this.height*3.5)){
            this.yVelocity = -this.yVelocity;
        }
        if (this.y === (this.canvas.height - this.height) && this.yVelocity !== 0){
            
            this.yVelocity = 0;
            this.anim.frame_row_index = 0;
            this.anim.update_frame_set(this.frame_set[0], 5);
        }
        
        if ((this.duckY < this.canvas.height - this.duckHeight + (this.duckHeight - this.minDuck)) && (this.duckFrames < this.maxDuckFrames)){
            this.duckY += this.duckVelocity
        } else if ((this.duckY === this.canvas.height - this.duckHeight + (this.duckHeight - this.minDuck)) && (this.duckFrames < this.maxDuckFrames)){
            this.duckFrames += 1;
        } else if ((this.duckY > this.canvas.height - this.duckHeight) && (this.duckFrames === this.maxDuckFrames)){
            this.duckY -= this.duckVelocity
        }
        if (this.duckY === (this.canvas.height - this.duckHeight) && this.duckVelocity !== 0){
            this.duckVelocity = 0;
            this.duckFrames = 0;
            //temp fix
            setTimeout(() =>{
                this.anim.frame_row_index = 0;
                this.anim.update_frame_set(this.frame_set[0], 5);
            }, 450);              
        }
    }

    display(){

        this.context.fillStyle = "#FFFFFF";
        this.context.drawImage(this.sprite_image, this.anim.frame_index * this.width, this.anim.frame_row_index * this.height, this.width, this.height, 20, this.y, this.width, this.height)
        
    }

    verticalMovement(direction){
        switch(direction){
            case 'Space':              
                if (this.yVelocity === 0 && this.duckVelocity === 0){
                    this.anim.frame_row_index = 2;
                    this.anim.update_frame_set(this.frame_set[2], 5);
                    this.yVelocity -= this.jumpSpeed
                }
                break;
            case 'Down':
                if (this.duckVelocity === 0 && this.yVelocity === 0){
                    this.anim.frame_row_index = 1;
                    this.anim.update_frame_set(this.frame_set[1], 2);
                    this.duckVelocity += this.duckSpeed
                }
                break;
            default:
                this.anim.update_frame_set(this.frame_set[0], 4);
        }    
    }

    

}

export default Character;