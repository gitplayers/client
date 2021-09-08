import React, {useContext, useState} from 'react';
import axios from 'axios';
const BASE_URL = "https://gamein-vitation.herokuapp.com";

const WeddingContext = React.createContext();

export function useWedding() {
    return useContext(WeddingContext);
}


export function WeddingProvider({children}) {
    const [weddingData, setWeddingData] = useState({});

    async function weddingFetch(wedding_name){
        try {
            let { data } = await axios.get(`${BASE_URL}/json/${wedding_name}/`)
            setWeddingData(data);
            return data;
        } catch(err){
            return err;
        }
    }

    function weddingLink(data){
        console.log('data set')
        console.log(data);
        setWeddingData(data);
    }


    const value = { weddingLink, weddingData, weddingFetch };
    return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>;
}

