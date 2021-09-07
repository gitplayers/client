import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useWedding } from "../../Context/WeddingContext";
const Welcome = () => {

    const { weddingFetch } = useWedding();
    const { wedding_name } = useParams();
    const [ error, setError ] = useState("");
    const [ playerNames, setPlayerNames ] = useState([]);
    const [ gameIds, setGameIds ] = useState([])
    const [ loading, setLoading ] = useState(true);

    const decideErrorMessage = (error) => {
        switch(error){
            case 404:
                return "It looks like we couldn't find that wedding name... The link may have expired, or maybe there is a typo in the link name."
            case 500:
                return "It looks like there's been an error with the server... Wait a while and refresh to try again."
            default:
                return "There's been an error..."
        }
    }

    useEffect(() => {
        const retrieveWeddingData = async () => {
            let data = await weddingFetch(wedding_name);
            if (data.side1){
                let players = [];
                let ids = [];
                players.push(data.side1.character.name);
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

    return (
        <>
        {error === "" ?
        <main>
            <h1>Welcome!</h1>
            <h2>How to play...</h2>
            {loading ? <h3>Loading..</h3> :
                <> 
                <p>Run down the aisle while answering questions about {playerNames[0]} or {playerNames[1]}, jump (spacebar) or duck (down arrow key) over or under obstacles to get a score as high as possible! Answering questions correctly will give you a score multiplier, answering a question wrong will reduce the multiplier. If you hit an obstacle your score will be reduced so try and avoid them as best you can! At the end of the game you'll be able to view the scores of other people in the wedding and see where you are on the leaderboard! Enjoy!!</p>
                <h2>Select an option below to start the game..</h2>
                
                <div>
                    <button onClick={startSide1Game}>I'm on {playerNames[0]}'s side!</button>
                    <button onClick={startSide2Game}>I'm on {playerNames[1]}'s side!</button>
                    <button onClick={skipToInvite}>Just take me to the invite please..</button>
                </div>
                </>
            }
        </main> : <h3>{error}</h3>}
        </>
    );
}
 
export default Welcome;