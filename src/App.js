import './App.css';
import Navbar from "./components/Navbar.tsx";
import Login from "./components/Login.tsx"
import Home from "./components/Home.tsx";
import {Routes , Route, useLocation, Navigate} from 'react-router-dom';
import React, {useEffect, useReducer, useState} from "react";
import userReducer from "./reducers/userReducer.tsx";
import {UserContext, UserDispatchContext} from "./contexts/userContext.tsx";
import ViewTodo from "./components/ViewTodo.tsx";
import DisplayPosts from './components/DisplayPosts.tsx';
import DisplayTodos from "./components/DisplayTodos.tsx";
import DisplayComments from "./components/DisplayComments.tsx";
import axios from "axios";
import Footer from './components/Footer.tsx';


function App() {
    const [results, setResults] = useState([]);
    const handleResults = (fetchedData)=>{
        setResults(fetchedData)
    }

    const location = useLocation()
    let {pathname} = location;
    let data=pathname.slice(1)
    const [display, setDisplay] = useState('');
    const initialEmail = localStorage.getItem('email');
    const [email, dispatch] = useReducer(userReducer, initialEmail);

    const handleDisplay = (displayItem) => {
        setDisplay(displayItem);
        setResults([]);
        fetchData(displayItem);
    }

    useEffect(()=>{
        if(data === 'comments' || data === 'posts' || data === 'todos')
            fetchData(data)
    }, [data])

    const baseUrl = 'https://jsonplaceholder.typicode.com/'
    const fetchData =async(currentDisplay)=>{
        const response = await axios.get(baseUrl+currentDisplay);
        console.log("responseresponse",response)
        setResults(response.data.slice(0, 100))
    }

  return (
    <div className="App">
           <UserContext.Provider value={email}>
            <UserDispatchContext.Provider value={dispatch}>

                <Navbar handleDisplay={handleDisplay}/>
                <Routes>
  {email !== null ? (
    <>
      <Route path="login/" element={<Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route index element={<Home />} />

      <Route path="posts/" element={<DisplayPosts results={results} handleResults={handleResults} />} />
      <Route path="comments/" element={<DisplayComments results={results} handleResults={handleResults} />} />
      <Route path="todos/" element={<DisplayTodos results={results} handleResults={handleResults} />} />
    </>
  ) : (
    <>
      <Route path="*" element={<Navigate to="login/" />} />
      <Route path="login/" element={<Login />} />
    </>
  )}
</Routes>

            </UserDispatchContext.Provider>
        </UserContext.Provider>
        <Footer />
    </div>
  );
}

export default App;

