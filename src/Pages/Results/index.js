import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useWedding } from "../../Context/WeddingContext";
import { decideErrorMessage } from "../../Helpers";
import "./style.css";
const BASE_URL = "https://gamein-vitation.herokuapp.com";
const Results = () => {

    const { push } = useHistory();
    const { wedding_name } = useParams();
    const { weddingData, weddingFetch } = useWedding();
    const [ allScores, setAllScores ] = useState([]);
    const [ side1Scores, setSide1Scores ] = useState([]);
    const [ side2Scores, setSide2Scores ] = useState([]);
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ names, setNames ] = useState([]);
    const [ selectValue, setSelectValue ] = useState("allScores");

    useEffect(() => {
        const fetchScores = async () => {
            console.log(weddingData);
            
            if (Object.keys(weddingData).length === 0){
                let results = await weddingFetch(wedding_name);
                if (!results.side1){
                    let message = decideErrorMessage(results.response.status)
                    setError(message);
                }
            } else {
                let players = [];
                let side1 = await axios.get(`${BASE_URL}/json/${weddingData.side1.id}/scores`);
                let side2 = await axios.get(`${BASE_URL}/json/${weddingData.side2.id}/scores`);
                let joinedScores = side1.data.scores.concat(side2.data.scores)
                players.push(weddingData.side1.character.name);
                players.push(weddingData.side2.character.name);
                setNames(players);
                setAllScores(joinedScores)
                setSide1Scores(side1.data.scores);
                setSide2Scores(side2.data.scores);
            }
        }
        fetchScores();
        setLoading(false);
    }, [weddingData])

    const sortAndMapScores = (array) => {
        array.sort((a, b) => {
            if (b.score < a.score) {
                return -1
            }
            if (b.score > a.score) {
                return 1
            }
            return 0;
        })
        return array.map((score,i) => {
            return (
                <tr  key={i}>
                    <td className="resultRow">{i + 1}</td>
                    <td className="resultRow">{score.name}</td>
                    <td className="resultRow">{score.score}</td>
			    </tr>
            )
        })
    }

    const renderTotalResults = () => {
        return sortAndMapScores(allScores.slice(0));
    }

    const renderSide1Results = () => {
        return sortAndMapScores(side1Scores.slice(0));
    }

    const renderSide2Results = () => {
        return sortAndMapScores(side2Scores.slice(0));
    }


    const renderInvitePage = () => {
        push(`/invite/${wedding_name}`)
    }

    const updateSelect = (e) => {
        setSelectValue(e.target.value);
    }

    const selectBodyResults = () => {
        switch(selectValue){
            case 'allResults':
                return renderTotalResults();
            case `${names[0]}`:
                return renderSide1Results();
            case `${names[1]}`:
                return renderSide2Results();
            default:
                return renderTotalResults();
        }

    }

    return (
        <>
        {error === "" ? 
        <>
            {loading ? <h1>loading..</h1> :        
            <div id="resultsSection">
                <h1>Results</h1>
                <div id="selectDiv">
                    <select onChange={updateSelect} name="results" id="results">
                        <option value="allResults">All results</option>
                        <option value={names[0]}>{names[0]}'s side</option>
                        <option value={names[1]}>{names[1]}'s side</option>
                    </select>
                </div>
                <section id="table">
                    <table className="resultsTable">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Guest Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>{selectBodyResults()}</tbody>
                    </table> 
                </section>
                <div id="inviteButtonDiv">
                    <button onClick={renderInvitePage}>See my invite!!</button>
                </div>
            </div>
            }
        </>
        : <h3>{error}</h3>}

        </> 
    
    );
}
 
export default Results;