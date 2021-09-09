import React, { useState } from 'react';
import "./style.css";
import { images, largeSpriteImages } from '../../Helpers';
const Home = () => {

    const [ currentHair, setCurrentHair ] = useState('H1');
    const [ currentSkin, setCurrentSkin ] = useState('S1'); 
    const [ currentDress, setCurrentDress ] = useState('D1');
    const [ currentEyes, setCurrentEyes ] = useState('E1');

    const cycleOptions = (direction, bodyPart) => {
        let partList;
        let initial = bodyPart.slice(0, 1);
        if (initial === 'D'){
            if (currentSkin.slice(1) <= 3){
                partList = ['D1', 'D2', 'D3', 'D4'];
            } else {
                partList = ['D5', 'D6', 'D7'];
            }
        } else {
            if (currentSkin.slice(1) <= 3){
                partList = [`${initial}1`, `${initial}2`, `${initial}3`]
            } else {
                partList = [`${initial}4`, `${initial}5`, `${initial}6`]
            }
        }
        let currentIndex;
        switch(bodyPart){
            case 'Hair':
                currentIndex = partList.indexOf(currentHair);
                break;
            case 'Skin':
                currentIndex = partList.indexOf(currentSkin);
                break;
            case 'Dress':
                currentIndex = partList.indexOf(currentDress);
                break;
            case 'Eyes':
                currentIndex = partList.indexOf(currentEyes);
                break;
            default:
                return;
        }
        let indexToChoose;
        if (direction === "next"){
            if (currentIndex + 1 > partList.length - 1){
                indexToChoose = 0;
            } else {
                indexToChoose = currentIndex + 1
            }
        } else {
            if (currentIndex - 1 < 0){
                indexToChoose = partList.length - 1
            } else {
                indexToChoose = currentIndex - 1
            }
        }
        switch(bodyPart){
            case 'Hair':
                setCurrentHair(partList[indexToChoose]);
                break;
            case 'Skin':
                setCurrentSkin(partList[indexToChoose]);
                break;
            case 'Dress':
                setCurrentDress(partList[indexToChoose]);
                break;
            case 'Eyes':
                setCurrentEyes(partList[indexToChoose]);
                break;
            default:
                return;
        }
    }   

    const renderButtons = (direction) => {
        let symbol;
        if (direction === "next"){
            symbol = ">"
        } else {
            symbol = "<"
        }
        let buttonList = ['Hair', 'Eyes', 'Skin', 'Dress']
        return buttonList.map(b => {
            return (
                <section key={b} className="buttonDiv">
                    <button id={`${b}NextButton`} onClick={() => cycleOptions(direction, b)}>{symbol}</button>
                </section>
            )
        })
    }

    const renderCharacterSelect = () => {
        return (
            <div id="characterSelect">
                <img className="hair" src={largeSpriteImages[`${currentHair}.png`].default}></img>
                <img className="skin" src={largeSpriteImages[`${currentSkin}.png`].default}></img>
                <img className="dress" src={largeSpriteImages[`${currentDress}.png`].default}></img>
                <img className="eyes" src={largeSpriteImages[`${currentEyes}.png`].default}></img>
                <div id="nextButtons">
                    {renderButtons('next')}
                </div>
                <div id="prevButtons">
                    {renderButtons('prev')}
                </div>
            </div>
        )
    }

    const toggleGender = () => {
        if (currentHair.slice(1) <= 3){
            setCurrentHair('H4');
            setCurrentSkin('S4');
            setCurrentDress('D5');
            setCurrentEyes('E4');
        } else {
            setCurrentHair('H1');
            setCurrentSkin('S1');
            setCurrentDress('D1');
            setCurrentEyes('E4');
        }
    }

    const forwardToDjango = () => {
        window.location.assign("https://gamein-vitation.herokuapp.com/");
    }

    return (
        <>
            <div>
                <h2>Have you just got engaged?</h2>
                <h2>Do you and your friends enjoy fast paced games?</h2>
                <h2>Do you want to test your friends and family's knowledge about you and your partner?</h2>
            </div>
            <div>
                <h1>Welcome to Gamevitation!</h1>
            </div>
            <div>
                <img src={images["logo.png"].default}></img>
            </div>
            <h3>We have created a bespoke wedding invitation service where you can create a custom game to share with your friends and family!</h3>
            <div className="stepDiv">
                <h2>Step 1</h2>
                <p>placeholder</p>
                {/* <p>Register and configure your game!</p> */}
            </div>
            <div className="stepDiv">
                <h2>Step 2</h2>
                <p>placeholder</p>
                {/* <p>Send out your personalised link to the game to your friends and family and enjoy!</p> */}
            </div>
            <div className="stepDiv">
                <h2>Step 3</h2>
                <p>placeholder</p>
                {/* <p>Check out how your friends and family did with our leaderboards, and all participants can view your personalised invite!</p> */}
            </div>
            <div id="djangoButton">
                <button onClick={forwardToDjango}>Register here!</button>
            </div>
            <div >
                <h2>Checkout our game in action here</h2>
            </div>
            <div>
                <h2>Checkout some of our character customization</h2>
                <button id="genderToggle" onClick={toggleGender}>Toggle character style</button>
                {renderCharacterSelect()}
            </div>
        </>
    );
}
 
export default Home;