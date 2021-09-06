import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Welcome = () => {

    const [ playerNames, setPlayerNames ] = useState([]);
    const [ gameIds, setGameIds ] = useState([])
    const [ loading, setLoading ] = useState(true);
    useEffect(() => {
        //fetch
        setPlayerNames(['Monica', 'Sammie']);
        setLoading(false);
    }, [])

    const { push } = useHistory();

    const startGroomGame = () => {
        push('/game');
    }

    const startBrideGame = () => {
        push('/game');
    }

    return (
        <main>
            <h1>Welcome!</h1>
            <h2>How to play...</h2>
            {loading ? <h3>Loading..</h3> :
                <> 
                <p>Run down the aisle while answering questions about {playerNames[0]} or {playerNames[1]}, jump (spacebar) or duck (down arrow key) over or under obstacles to get a score as high as possible! Answering questions correctly will give you a score multiplier, answering a question wrong will reduce the multiplier. If you hit an obstacle your score will be reduced so try and avoid them as best you can! At the end of the game you'll be able to view the scores of other people in the wedding and see where you are on the leaderboard! Enjoy!!</p>
                <h2>Select an option below to start the game..</h2>
                
                <div>
                    <button onClick={startGroomGame}>I'm on {playerNames[0]}'s side!</button>
                    <button onClick={startBrideGame}>I'm on {playerNames[1]}'s side!</button>
                </div>
                </>
            }


        </main>
    );
}
 
export default Welcome;