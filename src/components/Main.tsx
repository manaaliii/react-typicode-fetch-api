import AppRoutes from "../routes/AppRoutes.tsx";
import React, {useContext} from "react";
import Navbar from "./Navbar.tsx";
import {useEffect} from 'react';
import {Actions} from "../reducers/ResultsReducer.tsx";
import {useLocation} from 'react-router-dom';
import Footer from './Footer.tsx';
import axios from 'axios';
import {ResultsDispatchContext} from "../contexts/ResultsContext.tsx";

const Main = () => {
    const dispatch = useContext(ResultsDispatchContext);

    const location = useLocation()
    let {pathname} = location;
    let data = pathname.slice(1)

    const handleDisplay = (displayItem) => {
        dispatch({
            type: Actions.SET,
            payload: {
                results: []
            }
        });
        fetchData(displayItem);
    }

    useEffect(() => {
        if (data === 'comments' || data === 'posts' || data === 'todos') {
            fetchData(data);

        }
    }, [data])

    const baseUrl = 'https://jsonplaceholder.typicode.com/'

    const fetchData = async (currentDisplay) => {
        try {
            const response = await fetch(baseUrl + currentDisplay);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const fetchedData = await response.json();
            dispatch({
                type: Actions.SET,
                payload: {
                    results: fetchedData.slice(0, 100)
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <>
            <Navbar handleDisplay={handleDisplay}/>
            <AppRoutes/>
            <Footer/>
        </>
    )
}


export default Main;