class Character {
    constructor(context){
        this.x = 20;
        this.y = 130;
        this.height = 20;
        this.width = 20;
        this.yVelocity = 0;
        this.duckVelocity = 0;
        this.context = context
    }

    update(){
        this.y += this.yVelocity
        if (this.y < 80){
            this.yVelocity = -this.yVelocity;
        }
        if (this.y === 130 && this.yVelocity !== 0){
            this.yVelocity = 0;
        }
        this.y += this.duckVelocity
        if (this.y > 140){
            this.duckVelocity = -this.duckVelocity;
        }
        if (this.y === 130 && this.duckVelocity !== 0){
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
                    this.yVelocity -= 10
                }
                break;
            case 'Down':
                if (this.duckVelocity === 0 && this.yVelocity === 0){
                    this.duckVelocity += 5
                }
                break;
        }
    }

}

export default Character;