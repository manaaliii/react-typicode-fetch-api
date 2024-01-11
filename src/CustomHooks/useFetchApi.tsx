import axios from "axios";
import {useEffect} from "react";

const baseUrl = 'https://jsonplaceholder.typicode.com/'

const useFetchApi=(category:string, handleResults)=>{
    const fetchApi=async()=>{
            const response = await axios.get(baseUrl+category);
            handleResults(response.data.slice(0, 100))
    }

    return [fetchApi];

}

export {useFetchApi};