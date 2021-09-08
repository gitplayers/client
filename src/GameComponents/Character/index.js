import  Animation from './animation';

class Character {
    constructor(context, canvas){
        this.jumpSpeed = 10;
        this.duckSpeed = 2;
        // this.height = 20;
        // this.width = 20;
        this.height = 33;
        this.width = 32;
        this.duckHeight = 32;
        this.minDuck = 26;
        this.yVelocity = 0;
        this.duckVelocity = 0;
        this.duckFrames = 0;
        this.maxDuckFrames = 3;
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
        //this.duckHeight is gonna have to be some switch statement that goes 31, 29, 28, 26*3, 28, 29, 31
        //this.height is 32 - 30 - 28 - 26 - 26 - 26 - 28 - 30 - 32 
        //if height = 26 count = count + 1 if height = 26 and count = 3 go up
        //when ducking height is actually increasing, so originally we have 150 - 117, or 118, so will go down to 112
        //duckY originally 118, will go up to 124
        //will be 118 120 122 124 124 124 122 120 118
        if (this.duckY < this.canvas.height - this.duckHeight + (this.duckHeight - this.minDuck)){
            this.duckY += this.duckVelocity
        } else if ((this.duckY === this.canvas.height - this.duckHeight + (this.duckHeight - this.minDuck)) && (this.duckFrames < this.maxDuckFrames)){
            this.duckFrames += 1;
        } else if ((this.duckY >= this.canvas.height - this.duckHeight + (this.duckHeight - this.minDuck)) && (this.duckFrames === this.maxDuckFrames)){
            this.duckY -= this.duckVelocity
        }

        if (this.duckHeight === (this.canvas.height - this.duckHeight) && this.duckVelocity !== 0){
            this.duckVelocity = 0;
            console.log("duckVelocity reset")
            //temp fix
            setTimeout(() =>{
                // console.log("howdy")
                this.anim.frame_row_index = 0;
                this.anim.update_frame_set(this.frame_set[0], 5);
            }, 1750);              
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
                    this.anim.update_frame_set(this.frame_set[1], 3);
                    this.duckVelocity += this.duckSpeed
                }
                break;
            default:
                this.anim.update_frame_set(this.frame_set[0], 4);
        }
        // this.anim.update_frame();        
    }

    

}

export default Character;