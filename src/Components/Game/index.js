import React, { useRef, useEffect, useState } from 'react';
import { Character, FloorObstacle, Scoreboard, DuckObstacle } from '../../GameComponents';
import { shuffle } from '../../Helpers';
import { useParams, useHistory } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { useWedding } from "../../Context/WeddingContext";
import { spriteImages } from '../../Helpers';
const BASE_URL = "https://gamein-vitation.herokuapp.com";
let gameInProgress = true;
let scoreMultiplier = 1;
let progressStream = null;
const Game = () => {

    const { weddingData } = useWedding();
    const { push } = useHistory();
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");
    const [ questions, setQuestions ] = useState([]);
    const [ gameHost, setGameHost ] = useState("");
    const [ currentScore, setCurrentScore] = useState(0);
    const [ progressValue, setProgressValue ] = useState(100);
    const speed = 15;
    const canvasRef = useRef(null); 
    const questionDelay = 10000;
    const modalRef = useRef(null);

    const decideErrorMessage = (error) => {
        switch(error){
            case 404:
                return "It looks like we couldn't find that game id... The link may have expired.."
            case 500:
                return "It looks like there's been an error with the server... Wait a while and refresh to try again."
            default:
                return "There's been an error..."
        }
    }

    useEffect(() => {
        console.log(weddingData);
        const fetchGameData = async () => {
            try {
                let { data } = await axios.get(`${BASE_URL}/json/${id}/`)
                setQuestions(data.questions);
                setGameHost(data.character.name);
            } catch (err) {
                let message = decideErrorMessage(err.response.status)
                setError(message);
            }
        }

        fetchGameData();
        setLoading(false);

    }, [])

    useEffect(() => {
        if (!loading){
            const canvas = canvasRef.current; 
            const context = canvas.getContext('2d');
            
            const character = new Character(context, canvas);
            const floorObstacle = new FloorObstacle(context, canvas);
            const duckObstacle = new DuckObstacle(context, canvas);
            const scoreboard = new Scoreboard(context, canvas);
    
            window.addEventListener("keydown", (e) =>  {
                const direction = e.code.replace('Arrow', '');
                character.verticalMovement(direction);
            })

            character.sprite_image.src = spriteImages["bride_var_1.png"].default;
    
            window.setInterval(() => {
    
                if (gameInProgress){
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    character.sprite_image.onload = () => {
                        character.display();
                    }
                    character.update();
                    floorObstacle.display();
                    floorObstacle.update();
                    duckObstacle.display();
                    duckObstacle.update();
                    scoreboard.display(scoreMultiplier);
                    scoreboard.update(scoreMultiplier);
                    setCurrentScore(scoreboard.score);
                    character.anim.update_frame();

                    if(((floorObstacle.x + floorObstacle.width > character.x && floorObstacle.x + floorObstacle.width < character.x + character.width) ||
                        (floorObstacle.x > character.x && floorObstacle.x < character.x + character.width))
                    && (character.y <= canvas.height - (character.height)) && (character.y > canvas.height - (character.height + floorObstacle.height))){
                        console.log('colision!')
                        if (scoreboard.score > 100){
                            scoreboard.score -= 100;
                        } else {
                            scoreboard.score = 0;
                        }
                    }
                    if(((duckObstacle.x + duckObstacle.width > character.x && duckObstacle.x + duckObstacle.width < character.x + character.width) ||
                    (duckObstacle.x > character.x && duckObstacle.x < character.x + character.width))
                    && ((character.duckY <= duckObstacle.y + duckObstacle.height))){
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
        }

    }, [loading])

    const resetTimeout = () => {
        if (gameInProgress){
            window.setTimeout(() => {
                toggleGameState()
            }, questionDelay)
        }
    }

    const updateProgressBar = () => {
        let timeRemaining = 100;
        progressStream = window.setInterval(() => {
            if (timeRemaining > 0){
                timeRemaining -= 0.5;
                setProgressValue(timeRemaining);
            } else {
                window.clearInterval(progressStream);
                questionIncorrect();
                removeQuestion();
                toggleGameState();
            }
        }, 50)
    }

    const toggleModal = () => {
        if (modalRef.current.style.display !== "block"){
            modalRef.current.style.display = "block"
            updateProgressBar();
        } else {
            modalRef.current.style.display = "none"
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

    const removeQuestion = () => {
        setQuestions((prevQuestions) => {
            let newQuestions = prevQuestions.slice(1)
            return newQuestions;
        })
    }

    const questionCorrect = () => {
        scoreMultiplier += 0.1;
    }

    const questionIncorrect = () => {
        if (scoreMultiplier > 1){
            scoreMultiplier -= 0.1;
        }
    }

    const returnMappedButtons = (array) => {
        return array.map((a, i) => {
            return (
                <section key={i} className="buttonSection">
                    <button id="optionButton"  onClick={() => {
                        if (a === questions[0].correct_answer){
                            questionCorrect();
                        } else {
                            questionIncorrect();
                        }
                        window.clearInterval(progressStream);
                        removeQuestion();
                        toggleGameState();
                    }}>{a}</button>
                </section>
            )
        })
    }

    const renderButtons = () => {
        if (progressValue === 100){
            let allAnswers = questions[0].incorrect_answers.slice(0);
            allAnswers.push(questions[0].correct_answer);
            shuffle(allAnswers);
            return returnMappedButtons(allAnswers);
        } else {
            let allAnswers = questions[0].incorrect_answers.slice(0);
            allAnswers.push(questions[0].correct_answer);
            return returnMappedButtons(allAnswers);
        }
    }

    const gameEnd = async (e) => {
        e.preventDefault();
        let user = e.target[0].value;
        if (user){
            let patchData = [{name: user, score: (currentScore - 1*scoreMultiplier).toFixed(0)}];
            await axios.patch(`${BASE_URL}/json/${id}/scores/`, {
                "id": id, "scores": patchData
            })
        } else {
            console.log('input your name please');
        }
        
        push(`/results/${weddingData.wedding_url}`)
    }

    const renderCurrentQuestion = () => {

        if (questions[0]){
            let filteredQuestion = questions[0].question.replaceAll('{{user}}', gameHost);
            return (
                <section>
                    <h1 className="questionTitle">{filteredQuestion}</h1>
                    {renderButtons()}
                    {renderProgressBar()}
                </section>
            )
        } else if (!questions[0] && !loading){
            if(modalRef.current && modalRef.current.style.display === "block"){
                window.clearInterval(progressStream);
            }
            return (
                <div>
                    <h1 className="questionTitle">Time is up! Game over!</h1>
                    <h2>Your score was: {(currentScore - 1*scoreMultiplier).toFixed(0)}</h2>
                    <h2>Input your name and submit your score to see where you placed on the leaderboards!</h2>
                    <form onSubmit={gameEnd}>
                        <div id="inputDiv">
                            <input id="name" type="text" placeholder="Your name goes here"/>
                        </div>
                        <div id="submitDiv">
                            <input id="submitBtn" type="submit" />
                        </div>
                    </form>
                </div>
            )
        }
    }

    const renderProgressBar = () => {
        return (<progress value={progressValue} max="100"></progress>)
    }

    return (
        <>
        {error === "" ? <>
            {loading ? <h3>loading..</h3> : 
            <main>
                <div role="canvas" id="canvas">
                    <canvas ref={canvasRef}></canvas>
                </div> 
                <div role="modal"id="modal" ref={modalRef}>
                    {renderCurrentQuestion()}
                </div>
            </main>
            } </>: <h3>{error}</h3>} 
        </>
    );
}
 
export default Game;