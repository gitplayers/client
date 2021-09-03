class Character {
    constructor(context, canvas){
        this.jumpSpeed = 10;
        this.duckSpeed = 5;
        this.height = 20;
        this.width = 20;
        this.yVelocity = 0;
        this.duckVelocity = 0;
        this.context = context;
        this.canvas = canvas;
        this.x = this.width;
        this.y = this.canvas.height - this.height;
    }

    update(){
        this.y += this.yVelocity
        if (this.y < this.canvas.height - (this.height*3.5)){
            this.yVelocity = -this.yVelocity;
        }
        if (this.y === (this.canvas.height - this.height) && this.yVelocity !== 0){
            this.yVelocity = 0;
        }
        this.y += this.duckVelocity
        if (this.y > (this.canvas.height - (this.height)*0.5)){
            this.duckVelocity = -this.duckVelocity;
        }
        if (this.y === (this.canvas.height - this.height) && this.duckVelocity !== 0){
            this.duckVelocity = 0;
        }
    }

    display(){
    
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    verticalMovement(direction){
        switch(direction){
            case 'Space':              
                if (this.yVelocity === 0 && this.duckVelocity === 0){
                    this.yVelocity -= this.jumpSpeed
                }
                break;
            case 'Down':
                if (this.duckVelocity === 0 && this.yVelocity === 0){
                    this.duckVelocity += this.duckSpeed
                }
                break;
        }
    }

}

export default Character;