import React, { useRef, useEffect, useState } from 'react';
import { QuestionModal } from '../../Components';
import { Character } from '../../GameComponents';
import './style.css';

const Game = () => {

    const [ gameInProgress, setGameInProgress ] = useState(false)
    const speed = 20;
    const canvasRef = useRef(null);

    useEffect(() => {
        console.log(gameInProgress);
    }, [gameInProgress])

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const character = new Character(context);
        window.addEventListener("keydown", (e) =>  {
            const direction = e.code.replace('Arrow', '');
            console.log(direction);
            character.verticalMovement(direction);
        })
        window.setInterval(() => {
            context.clearRect(0, 0 , canvas.width, canvas.height);
            character.display();
            character.update();
    
    
        }, 1000/speed);
        if (gameInProgress){
            window.setInterval(() => {
                setGameState(false);
            }, 10000)
        }

    })
    return ( 
        <div>
            <h1>Game</h1>
            <canvas ref={canvasRef}></canvas>
        </div> 
    );
}
 
export default Game;