import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWedding } from "../../Context/WeddingContext";

const Invite = () => {

    const { wedding_name } = useParams();
    const { weddingData, weddingFetch } = useWedding();
    const [ invitationData, setInvitationData ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getInvitationData = async () => {
            if (Object.keys(weddingData).length === 0){
                await weddingFetch(wedding_name);
            } else {
                console.log(weddingData.invitation);
                setInvitationData(weddingData.invitation);
            }
        }
        getInvitationData();
        setLoading(false);
    }, [weddingData])

    return (
        <>
            {loading ? <h1>Loading..</h1> : 
            <div>
                <h1>Invite</h1>
                <h2>{invitationData.title}</h2>
                <p>{invitationData.message}</p> 
            </div>
            }
        </>
    );
}
 
export default Invite;