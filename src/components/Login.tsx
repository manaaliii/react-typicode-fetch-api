import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {UserDispatchContext} from "../contexts/UserContext.tsx";


const Actions = {
    SET: 'set_user',
    REMOVE: 'remove_user'
}

const userCredentials = [
    {'email': 'user1@example.com', 'password': '123456'},
    {'email': 'user2@example.com', 'password': '456123'},
    {'email': 'user3@example.com', 'password': '789456'}
]

const Login: React.FC = () => {
    const history = useNavigate();
    const dispatch = useContext(UserDispatchContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        console.log('')
        const userExists = userCredentials.some((userCredential) => userCredential.email === email
            && userCredential.password === password);
        if (userExists) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            dispatch({
                type: Actions.SET,
                payload: {
                    email: email,
                    password: password
                }
            })
            history('/')
            return true;
        }
        alert('Enter valid credentials !');
        return false;
    }

    return (
        <>
            <h1>Login Page</h1>
            <form className='mx-auto my-2' style={{width: '30%', border: '1px solid gray', padding: '0.5em 0.5em'}}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input type="email" className="form-control" onChange={(event) => setEmail(event.target.value)}
                           placeholder="Email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control"
                           onChange={(event) => setPassword(event.target.value)} placeholder="Password"/>
                </div>
                <button type="submit" className="my-3 btn btn-primary" onClick={handleLogin}>Let's go!</button>
            </form>
        </>
    )
}

export default Login;