import AppRoutes from "./AppRoutes.tsx";
import React, {useContext} from "react";
import Navbar from "./Navbar.tsx";
import { useEffect } from 'react';
import {Actions} from "../reducers/ResultsReducer.tsx";
import { useLocation } from 'react-router-dom';
import Footer from './Footer.tsx';
import axios from 'axios';
import {ResultsContext, ResultsDispatchContext} from "../contexts/ResultsContext.tsx";

const Main = () =>{
  const results = useContext(ResultsContext);
  const dispatch = useContext(ResultsDispatchContext);


  const location = useLocation()
  let { pathname } = location;
  let data = pathname.slice(1)

  const handleDisplay = (displayItem) => {
    dispatch({
        type: Actions.SET,
        payload:{
            results: []
        }
    });
      fetchData(displayItem);
  }

  useEffect(() => {
      if (data === 'comments' || data === 'posts' || data === 'todos'){
            fetchData(data);
            
      }
  }, [data])

  const baseUrl = 'https://jsonplaceholder.typicode.com/'

  const fetchData = async (currentDisplay) => {
    
    const response = await axios.get(baseUrl + currentDisplay);
      const fetchedData = response.data.slice(0, 100)
      dispatch({
          type: Actions.SET,
          payload:{
              results: fetchedData
          }
      });
  }

  return(
    <>
     <Navbar handleDisplay={handleDisplay} />
     {results?.length && <AppRoutes />}
     <Footer />
    </>
  )
}

export default Main;