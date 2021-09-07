import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useWedding } from "../../Context/WeddingContext";
const BASE_URL = "https://gamein-vitation.herokuapp.com";
const Results = () => {

    const { wedding_name } = useParams();
    const { weddingData, weddingFetch } = useWedding();
    const [ allScores, setAllScores ] = useState([]);
    const [ side1Scores, setSide1Scores ] = useState([]);
    const [ side2Scores, setSide2Scores ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            console.log(weddingData);
            if (Object.keys(weddingData).length === 0){
                await weddingFetch(wedding_name);
            } else {
                let side1 = await axios.get(`${BASE_URL}/json/${weddingData.side1.id}/scores`);
                let side2 = await axios.get(`${BASE_URL}/json/${weddingData.side2.id}/scores`);
                let joinedScores = side1.data.scores.concat(side2.data.scores)
                setAllScores(joinedScores)
                setSide1Scores(side1.data.scores);
                setSide2Scores(side2.data.scores);
            }

            // console.log(data.scores);
            // setScores(data.scores);
        }
        fetchScores();
        setLoading(false);
    }, [weddingData])

    const renderTotalResults = () => {
        let sortedScores = allScores.slice(0)
        sortedScores.sort((a, b) => {
            if (b.score < a.score) {
                return -1
            }
            if (b.score > a.score) {
                return 1
            }
            return 0;
        })
        return sortedScores.map((score,i) => {
            return (
                <section key={i}>
                    <p>{score.name}</p>
                    <p>{score.score}</p>
                </section>
            )
        })
    }

    const renderInvitePage = () => {
        
    }

    return (
        <>
        {loading ? <h1>loading..</h1> :        
        <div>
            <button onClick={renderInvitePage}>See my invite!!</button>
            <h1>Results</h1>
            <section> 
                {renderTotalResults()}
            </section>
        </div>
        }
        </> 
    
    );
}
 
export default Results;