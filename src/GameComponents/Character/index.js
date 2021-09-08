import  Animation from './animation';

class Character {
    constructor(context, canvas){
        this.jumpSpeed = 10;
        this.duckSpeed = 0.1;
        // this.height = 20;
        // this.width = 20;
        this.height = 33;
        this.width = 32;
        this.yVelocity = 0;
        this.duckVelocity = 0;
        this.context = context;
        this.canvas = canvas;
        this.x = this.width;
        this.y = this.canvas.height - this.height;
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
        this.y += this.duckVelocity
        if (this.y > (this.canvas.height - (this.height)*2)){
           this.duckVelocity = -this.duckVelocity;
        }

        // console.log(this.y)
        // console.log(this.canvas.height - this.height)
        // console.log(this.duckVelocity)
        if (this.y === (this.canvas.height - this.height) && this.duckVelocity !== 0){
            this.duckVelocity = 0;
            // console.log("here")
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