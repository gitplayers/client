import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useWedding } from "../../Context/WeddingContext";
import { decideErrorMessage } from "../../Helpers";
import "./style.css";
import { largeSpriteImages } from "../../Helpers";

const Welcome = () => {

    const { weddingFetch } = useWedding();
    const { wedding_name } = useParams();
    const [ error, setError ] = useState("");
    const [ playerNames, setPlayerNames ] = useState([]);
    const [ gameIds, setGameIds ] = useState([])
    const [ loading, setLoading ] = useState(true);
    const [ characterSide1Img, setCharacterSide1Img] = useState([]);
    const [ characterSide2Img, setCharacterSide2Img] = useState([]);

    useEffect(() => {
        const retrieveWeddingData = async () => {
            let data = await weddingFetch(wedding_name);
            if (data.side1){
                let players = [];
                let ids = [];
                let side1config = [];
                let side2config = [];
                let side1Data = data.side1.character;
                let side2Data = data.side2.character;
                side1config.push(`H${side1Data.hair_id}.png`)
                side1config.push(`S${side1Data.skin_id}.png`)
                side1config.push(`D${side1Data.dress_id}.png`)
                side1config.push(`E${side1Data.eyes_id}.png`)
                side2config.push(`H${side2Data.hair_id}.png`)
                side2config.push(`S${side2Data.skin_id}.png`)
                side2config.push(`D${side2Data.dress_id}.png`)
                side2config.push(`E${side2Data.eyes_id}.png`)
                setCharacterSide1Img(side1config);
                setCharacterSide2Img(side2config);
                players.push(side1Data.name);
                players.push(data.side2.character.name);
                setPlayerNames(players);
                ids.push(data.side1.id);
                ids.push(data.side2.id);
                setGameIds(ids);
            } else {
                let message = decideErrorMessage(data.response.status);
                setError(message);
            }
        }
        retrieveWeddingData();
        setLoading(false);
    }, [])

    const { push } = useHistory();

    const startSide1Game = () => {
        push(`/game/${gameIds[0]}`);
    }

    const startSide2Game = () => {
        push(`/game/${gameIds[1]}`);
    }
    
    const skipToInvite = () => {
        push(`/invite/${wedding_name}`);
    }

    const renderSide1Img = () => {
        if (characterSide1Img.length > 1){
            return (
                <div id="characterDiv">
                    <img className="characterHair" src={largeSpriteImages[characterSide1Img[0].toString()].default}></img>
                    <img className="characterSkin" src={largeSpriteImages[characterSide1Img[1].toString()].default}></img>
                    <img className="characterDress" src={largeSpriteImages[characterSide1Img[2].toString()].default}></img>
                    <img className="characterEyes" src={largeSpriteImages[characterSide1Img[3].toString()].default}></img>
                </div>
            )
        }
    }

    const renderSide2Img = () => {
        if (characterSide2Img.length > 1){
            return (
                <div id="characterDiv">
                    <img className="characterHair" src={largeSpriteImages[characterSide2Img[0].toString()].default}></img>
                    <img className="characterSkin" src={largeSpriteImages[characterSide2Img[1].toString()].default}></img>
                    <img className="characterDress" src={largeSpriteImages[characterSide2Img[2].toString()].default}></img>
                    <img className="characterEyes" src={largeSpriteImages[characterSide2Img[3].toString()].default}></img>
                </div>
            )
        }
    }

    return (
        <>
        {error === "" ?
        <main>
            <h1>Welcome to the ultimate wedding invitation!</h1>
            <h2>How to play...</h2>
            {loading ? <h3>Loading..</h3> :
                <> 
                <p>Run down the aisle while answering questions about {playerNames[0]} or {playerNames[1]}, jump (spacebar) or duck (down arrow key) over or under obstacles to get a score as high as possible! Answering questions correctly will give you a score multiplier, answering a question wrong will reduce the multiplier. If you hit an obstacle your score will be reduced so try and avoid them as best you can! At the end of the game you'll be able to view the scores of other people in the wedding and see where you are on the leaderboard! Enjoy!!</p>
                <h2>Select an option below to start the game..</h2>
                <div id="side1">
                    <div id="side1ImageDiv">
                        {renderSide1Img()}
                    </div>
                    <button onClick={startSide1Game}>I'm on {playerNames[0]}'s side!</button>
                </div>
                <div id="side2">
                    <div id="side1ImageDiv">
                        {renderSide2Img()}
                    </div>
                    <button onClick={startSide2Game}>I'm on {playerNames[1]}'s side!</button>
                </div>
                <div id="skipButtonDiv">
                    <button onClick={skipToInvite}>Just take me to the invite please..</button>
                </div>
                </>
            }
        </main> : <h3>{error}</h3>}
        </>
    );
}
 
export default Welcome;