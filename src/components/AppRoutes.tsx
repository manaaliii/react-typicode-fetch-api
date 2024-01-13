import Login from "./Login.tsx"
import Home from "./Home.tsx";
import { Routes, Route, Navigate } from 'react-router-dom';
// @ts-ignore
import React, { useContext} from "react";
import DisplayPosts from './DisplayPosts.tsx';
import DisplayTodos from "./DisplayTodos.tsx";
import DisplayComments from "./DisplayComments.tsx";
import { UserContext } from "../contexts/UserContext.tsx";


const AppRoutes = () => {

    const email = useContext(UserContext)
    return (
        <Routes>
            {email !== null ? (
                <>
                    <Route path="login/" element={<Navigate to="/" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route index element={<Home item="" />} />

                    <Route path="posts/" element={<DisplayPosts  />} />
                    <Route path="comments/" element={<DisplayComments />} />
                    <Route path="todos/" element={<DisplayTodos  />} />
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

export default AppRoutes;