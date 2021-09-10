class Animation{
    constructor(delay, frame_set){
        this.count = 0;                 //counts the number of game cysles sincs last frae change
        this.delay = delay;             //the number of game cycles to wait until the next frame change
        this.frame = 0;                 //the value in the sprite sheet of the sprite/image to display
        this.frame_index = 0;           //The frame's index in the current animation frame set
        this.frame_row_index = 0
        this.frame_set = frame_set;     //the current animation fram set
    }

    // If the current frame set is different to the incomming one, change the frame_set
    update_frame_set(frame_set, delay =1){
        if(this.frame_set != frame_set){
            this.count = 0;             
            this.delay = delay;      
            this.frame_index = 0;    
            this.frame_set = frame_set;
            this.frame = this.frame_set[this.frame_index];          
        }
    }

    //if the current frame has been shown for the correct amount of time, switch to the next frame
    update_frame(){
        this.count++;
        if(this.count >= this.delay){
            this.count = 0;
            // if the frame index is the last item in the item set 
            this.frame_index = (this.frame_index == this.frame_set.length -1) ? 0 : this.frame_index + 1;
            this.frame = this.frame_set[this.frame_index];
        }
    }    
}

export default Animation;
// spritesheet object needs to be defined in character class
// in character vertical movemnt update the frame 