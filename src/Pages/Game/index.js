import React, { useRef, useEffect, useState } from 'react';
// import { QuestionModal } from '../../Components';
import { Character, Obstacle, Scoreboard } from '../../GameComponents';
import './style.css';

const Game = () => {

    const speed = 20;
    const canvasRef = useRef(null); 
    const questionDelay = 10000;
    const modalRef = useRef(null);
    let gameInProgress = true;

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const character = new Character(context, canvas);
        const obstacle = new Obstacle(context, canvas);
        const scoreboard = new Scoreboard(context, canvas)

        window.addEventListener("keydown", (e) =>  {
            const direction = e.code.replace('Arrow', '');
            character.verticalMovement(direction);
        })

        window.setInterval(() => {

            if (gameInProgress){
                context.clearRect(0, 0, canvas.width, canvas.height);
                character.display();
                character.update();
                obstacle.display();
                obstacle.update();
                scoreboard.display();
                scoreboard.update();
    
                if(((obstacle.x + obstacle.width > character.x && obstacle.x + obstacle.width < character.x + character.width) ||
                    (obstacle.x > character.x && obstacle.x < character.x + character.width))
                && (character.y <= canvas.height - (character.height)) && (character.y > canvas.height - (character.height + obstacle.height))){
                    console.log('colision!')
                    if (scoreboard.score > 100){
                        scoreboard.score -= 100;
                    } else {
                        scoreboard.score = 0;
                    }
                }
            }

            

        }, 1000/speed);
        
        window.setTimeout(() => {
            toggleGameState()
        }, questionDelay);

    }, [gameInProgress])

    const resetTimeout = () => {
        if (gameInProgress){
            window.setTimeout(() => {
                toggleGameState()
            }, questionDelay)
        }
    }

    const toggleModal = () => {
        if (modalRef.current.style.display !== "block"){
            modalRef.current.style.display = "block"
            // canvasRef.current.style.display = "none"
        } else {
            modalRef.current.style.display = "none"
            // canvasRef.current.style.display = "block"
        }
    }

    const toggleGameState = () => {
        if (gameInProgress){
            gameInProgress = false;
        } else {
            gameInProgress = true;
        }
        toggleModal()
        resetTimeout()
    }

    const renderForm = () => {
        return (
            <>
                <h1>Question Modal</h1>
                <button onClick={toggleGameState}>Answer Question</button>
            </>
        )
    }

    return ( 
        <main>
            <h1>Game</h1>
            <canvas ref={canvasRef}></canvas>
            <div id="modal" ref={modalRef}>
                {renderForm()}
            </div>
        </main> 
    );
}
 
export default Game;