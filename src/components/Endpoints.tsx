import Login from "./Login.tsx"
import Home from "./Home.tsx";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import React, { useContext} from "react";
import DisplayPosts from './DisplayPosts.tsx';
import DisplayTodos from "./DisplayTodos.tsx";
import DisplayComments from "./DisplayComments.tsx";
import { UserContext } from "../contexts/userContext.tsx";


const Endpoints = ({results, handleResults}) => {

    const email = useContext(UserContext)
    return (
        <Routes>
            {email !== null ? (
                <>
                    <Route path="login/" element={<Navigate to="/" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route index element={<Home item="" />} />

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
    )
}

export default Endpoints;