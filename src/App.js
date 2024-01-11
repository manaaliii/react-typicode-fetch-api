import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar.tsx";
import Login from "./components/Login.tsx"
import Home from "./components/Home.tsx";
import {Routes , Route, useLocation} from 'react-router-dom';
import React, {useEffect, useReducer, useState} from "react";
import userReducer from "./reducers/userReducer.tsx";
import {UserContext, UserDispatchContext} from "./contexts/userContext.tsx";
import ViewTodo from "./components/ViewTodo.tsx";
import DisplayPosts from './components/DisplayPosts.tsx';
import DisplayTodos from "./components/DisplayTodos.tsx";
import DisplayComments from "./components/DisplayComments.tsx";
import axios from "axios";


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
    }, [])

    const baseUrl = 'https://jsonplaceholder.typicode.com/'
    const fetchData =async(currentDisplay)=>{
        const response = await axios.get(baseUrl+currentDisplay);
        console.log("responseresponse",response)
        setResults(response.data.slice(0, 100))
    }

    // console.log("results", results)
  return (
    <div className="App">
        <UserContext.Provider value={email}>
            <UserDispatchContext.Provider value={dispatch}>

                <Navbar handleDisplay={handleDisplay}/>
                <Routes>
                    <Route exact path="/" element={email!==null && <Home item={display} />} />
                    <Route exact path="login/" element={email===null && <Login />} />
                    {/*<Route exact path={display+'/'} element={display && <Display item={display} />} />*/}
                    {email!==null && (
                        <>
                            <Route exact path={'viewtodo/:index'} element={<ViewTodo results={results}/>} />
                            <Route exact path='posts/' element={<DisplayPosts results={results} handleResults={handleResults} /> } />
                            <Route exact path='comments/'  element={<DisplayComments results={results} handleResults={handleResults}  /> } />
                            <Route exact path='todos/'  element={<DisplayTodos results={results}  handleResults={handleResults} /> } /></>
                    )}
                </Routes>
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
