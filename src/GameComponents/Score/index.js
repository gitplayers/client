class Scoreboard{
    constructor(context, canvas){
        this.canvas = canvas
        this.context = context
        this.fontSize = 15;
        this.x = this.canvas.width - this.fontSize;
        this.y = 15;
        this.score = 0;
    }
    
    display(){
        if (this.score >= 9 && this.score <= 99){
            this.x = this.canvas.width - this.fontSize*1.5;
        } else if (this.score >= 99 && this.score <= 999){
            this.x = this.canvas.width - this.fontSize*2;
        } else if (this.score >= 999 && this.score <= 9999){
            this.x = this.canvas.width - this.fontSize*2.5;
        } else if (this.score > 9999){
            this.x = this.canvas.width - this.fontSize*3;
        }
        this.context.font = `${this.fontSize}px Arial`
        this.context.fillText(Math.floor(this.score), this.x, this.y);

    }

    update(scoreMultiplier){
        this.score += 1 * scoreMultiplier;
    }

}

export default Scoreboard