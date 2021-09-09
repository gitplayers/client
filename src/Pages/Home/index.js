import React, { useState } from 'react';
import "./style.css";
import { images, largeSpriteImages } from '../../Helpers';
const Home = () => {

    console.log(images);

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
                <h1>Welcome to Gamevitation!</h1>
            </div>
            <div>
                <img src={images["logo.png"].default}></img>
            </div>
            <div>
                <h2>Are you looking to spice up the traditional event invitation process?</h2>
                <h2>Tired of creating standard invitations with designs that have been used 100s of times?</h2>
                <h2>You've come to the right place..</h2>
            </div>

            <h3>We have created a bespoke wedding invitation service where you can create a custom game to share with your friends and family!</h3>

            <div className="stepDiv">
                <div className="text2Div">
                    <h2>Fast paced gameplay with custom questions</h2>
                    <p>Send your guests your uniquely generated game link loaded with your personalised answers to questions inputted in your custom game configuration. Watch the leaderboards fill up as your guests submit their scores and compete to show who knows you best while enjoying fun gameplay complete with our own music.</p>
                </div>
                <div className="img2Div">
                    <img src={images["croppedBlushLaptop.png"].default}></img>
                    <div id="absoluteGifDiv">
                        <img src={images["gamelap4.gif"].default}></img>
                    </div>
                </div>
            </div>
            <div className="finalStepDiv">
                <div className="img3Div">
                    <button id="genderToggle" onClick={toggleGender}>Toggle character style</button>
                    {renderCharacterSelect()}
                </div>
                <div className="text3Div">
                    <h2>Complete character customizability</h2>
                    <p>Flexible character design tailored to your own appearance that will become the character running in the game to be operated by your guests! We have included fully interchangeable eyes, hair, skin and outfits - both character styles can wear either a suit or a dress, we're all about inclusivity!</p>
                </div>
            </div>
            <div className="stepDiv">
                <div className="textDiv">
                    <h2>Gamified shareable invitation</h2>
                    <p>Input the title and message of your custom invitation as you would a normal invite to provide necessary information to your guests, after your guests get their thrills from the gaming experience, this is the place to get down to business with the details of your special day.</p>
                </div>
                <div className="imgDiv">
                    <img src={images["blushScreen.png"].default}></img>
                    <div id="absoluteInviteDiv">
                        <img src={images["invite.png"].default}></img>
                    </div>
                </div>
            </div>
            <div id="djangoButton">
                <button onClick={forwardToDjango}>Register now!</button>
            </div>
        </>
    );
}
 
export default Home;