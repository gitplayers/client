import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWedding } from "../../Context/WeddingContext";
import { decideErrorMessage } from "../../Helpers";
import "./style.css";
const Invite = () => {

    const { wedding_name } = useParams();
    const { weddingData, weddingFetch } = useWedding();
    const [ invitationData, setInvitationData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");

    useEffect(() => {
        const getInvitationData = async () => {
            if (Object.keys(weddingData).length === 0){
                let results = await weddingFetch(wedding_name);
                if (!results.side1){
                    let message = decideErrorMessage(results.response.status);
                    setError(message);
                }
            } else {
                setInvitationData(weddingData.invitation);
            }
        }
        getInvitationData();
        setLoading(false);
    }, [weddingData])

    const renderInvitationMessage = () => {
        if (invitationData.message){
            let message = invitationData.message.slice(0)
            console.log(message);
            for (let i = 0; i<(1000-message.length); i++){
                message = message + " .";
            }
            console.log(message);
            // while (message.length < 400){
            //     message = message + "";
            // }
            return (<p>{message}</p>)
        }
    }

    const sendRSVP = () => {
        //email to host
    }

    return (
        <> {error === "" ? 
            <>
                {loading ? <h1>Loading..</h1> : 
                <div id="invite">
                    <div id="text">
                        <h1>{invitationData.title}</h1>
                        <section role="message">
                            {renderInvitationMessage()} 
                        </section>
                        <button onClick={sendRSVP}>RSVP</button>
                    </div>
                    <div role="stamp" id="stamp">
                        <img src="https://shop.royalmail.com/media/catalog/product/cache/3541af23d7a0b2cd4fd132ad21fe3039/d/s/ds1033a-1-machin-definitives-garnet-red_1.jpg"></img>
                    </div>
                </div>
                }
            </>
            : <h3>{error}</h3>}
        </>
    );
}
 
export default Invite;