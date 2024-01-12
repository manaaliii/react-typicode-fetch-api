import Endpoints from "./Endpoints.tsx";
import React from "react";
import Navbar from "./Navbar.tsx";
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer.tsx';
import axios from 'axios';

const Main = () =>{
    
  const [results, setResults] = useState([]);
  const handleResults = (fetchedData) => {
      setResults(fetchedData)
  }

  const location = useLocation()
  let { pathname } = location;
  let data = pathname.slice(1)

  const handleDisplay = (displayItem) => {
      setResults([]);
      fetchData(displayItem);
  }

  useEffect(() => {
      if (data === 'comments' || data === 'posts' || data === 'todos')
          fetchData(data)
  }, [data])

  const baseUrl = 'https://jsonplaceholder.typicode.com/'
  const fetchData = async (currentDisplay) => {
      const response = await axios.get(baseUrl + currentDisplay);
      console.log("responseresponse", response)
      setResults(response.data.slice(0, 100))
  }

  return(
    <>
     <Navbar handleDisplay={handleDisplay} />
     <Endpoints results={results} handleResults={handleResults} />
     <Footer />
    </>
  )
}

export default Main;