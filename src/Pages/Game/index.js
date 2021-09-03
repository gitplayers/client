import React, { useRef, useEffect, useState } from 'react';
import { QuestionModal } from '../../Components';
import { Character, Obstacle } from '../../GameComponents';
import './style.css';

const Game = () => {

    const [ gameInProgress, setGameInProgress ] = useState(true)
    const speed = 20;
    const canvasRef = useRef(null);

    useEffect(() => {
        console.log(gameInProgress);
    }, [gameInProgress])

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const character = new Character(context, canvas);
        const obstacle = new Obstacle(context, canvas);
        window.addEventListener("keydown", (e) =>  {
            const direction = e.code.replace('Arrow', '');
            character.verticalMovement(direction);
        })
        if (gameInProgress){
            window.setInterval(() => {
                context.clearRect(0, 0 , canvas.width, canvas.height);
                character.display();
                character.update();
                obstacle.display();
                obstacle.update();

                if(((obstacle.x + obstacle.width > character.x && obstacle.x + obstacle.width < character.x + character.width) ||
                    (obstacle.x > character.x && obstacle.x < character.x + character.width))
                && (character.y <= canvas.height - (character.height)) && (character.y > canvas.height - (character.height + obstacle.height))){
                    console.log('colision!')
                }
        
        
            }, 1000/speed);
        }
        // if (gameInProgress){
        //     window.setInterval(() => {
        //         setGameInProgress(false);
        //     }, 10000)
        // }

    })
    return ( 
        <div>
            <h1>Game</h1>
            <canvas ref={canvasRef}></canvas>
        </div> 
    );
}
 
export default Game;