import React, { useState } from 'react';
import { Game } from '../../Components';
import './style.css';

const GamePage = () => {

    const [ gameStarted, setGameStarted ] = useState(false);

    const startGame = (e) => {
        console.log(e.target)
        e.target.style.display = "none";
        if (e.target.id === "brideButton"){
            e.target.nextElementSibling.style.display = "none";
            let currentElement = e.target.previousElementSibling;
            for (let i = 0; i < 3; i++){
                currentElement = currentElement.previousElementSibling;
                currentElement.style.display = "none";
            }
        } else {
            e.target.previousElementSibling.style.display = "none";
            let currentElement = e.target.previousElementSibling.previousElementSibling;
            for (let i = 0; i < 3; i++){
                currentElement = currentElement.previousElementSibling;
                currentElement.style.display = "none";
            }
        }
        
        setGameStarted(true)
    }

    return ( 
        <main>
            <h1>Welcome!</h1>
            <h2>How to play...</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat purus sit amet ipsum varius, at varius lacus tempor. Sed semper mi et nibh suscipit, at consectetur lacus tristique. Suspendisse tempor posuere augue. Vestibulum lobortis dolor libero, in congue turpis tempus ac. Nullam pretium nisi dui, quis viverra sapien ullamcorper quis. Pellentesque sit amet arcu congue, vulputate nisl at, dictum lacus. In vitae velit turpis. Etiam rutrum nunc ac sem lacinia accumsan. Cras laoreet magna dui, in rhoncus orci pulvinar ac. Aliquam erat volutpat. Donec luctus nibh efficitur odio varius, vitae porttitor velit venenatis.</p>
            {gameStarted ? <Game /> : <h2>Choose a button below to start...</h2>}
            <button id="brideButton" onClick={startGame}>I'm part of the bridal party!</button>
            <button id="groomButton" onClick={startGame}>I'm part of the groom party!</button>
        </main> 
    );
}
 
export default GamePage;