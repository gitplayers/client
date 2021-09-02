import React, { useRef, useEffect } from 'react';
import { Character, Obstacle } from '../../GameComponents';
import './style.css';

const Game = () => {
    const speed = 20;
    const canvasRef = useRef(null);
    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const character = new Character(context);
        const obstacle = new Obstacle(context);
        window.addEventListener("keydown", (e) =>  {
            const direction = e.code.replace('Arrow', '');
            console.log(direction);
            character.verticalMovement(direction);
        })
        window.setInterval(() => {
            context.clearRect(0, 0 , canvas.width, canvas.height);
            character.display();
            character.update();
            obstacle.display();
            obstacle.update();
            
            if((character.x < obstacle.x && obstacle.x < character.x+character.width)&&(character.y <= 130 && character.y > 110)){
                console.log('colision!')
            }
    
    
        }, 1000/speed);
    })
    return ( 
        <div>
            <h1>Game</h1>
            <canvas ref={canvasRef}></canvas>
        </div> 
    );
}
 
export default Game;