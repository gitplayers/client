import React, { useState } from 'react';
import { Game } from '../../Components';



const GamePage = () => {

    const [ gameStarted, setGameStarted ] = useState(false);

    const startGame = (e) => {
        console.log(e.target)
        e.target.style.display = "none";
        setGameStarted(true)
    }



    return ( 
        <main>
            <h1>Game</h1>
            <button onClick={startGame}>start game</button>
            {gameStarted ? <Game /> : <h2>Waiting for game to start...</h2>}
            
        </main> 
    );
}
 
export default GamePage;