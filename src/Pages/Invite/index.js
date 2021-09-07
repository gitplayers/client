import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWedding } from "../../Context/WeddingContext";
import { decideErrorMessage } from "../../Helpers";
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
                console.log(weddingData.invitation);
                setInvitationData(weddingData.invitation);
            }
        }
        getInvitationData();
        setLoading(false);
    }, [weddingData])

    return (
        <> {error === "" ? 
            <>
                {loading ? <h1>Loading..</h1> : 
                <div>
                    <h1>Invite</h1>
                    <h2>{invitationData.title}</h2>
                    <p>{invitationData.message}</p> 
                </div>
                }
            </>
            : <h3>{error}</h3>}
        </>
    );
}
 
export default Invite;