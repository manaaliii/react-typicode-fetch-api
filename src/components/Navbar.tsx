import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext, UserDispatchContext} from "../contexts/UserContext.tsx";


const Actions = {
    SET: 'set_user',
    REMOVE: 'remove_user'
}

interface NavbarProps {
    handleDisplay: (input: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({handleDisplay}) => {
    const user = useContext(UserContext);
    const dispatch = useContext(UserDispatchContext);
    const handleClick = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        dispatch({
            type: Actions.REMOVE,
            payload: {}
        })
        handleDisplay('');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className={`navbar-brand${user ? '' : ' disabled-link'}`} to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                         className="bi bi-house" viewBox="0 0 16 16">
                        <path
                            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                    </svg>
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link onClick={() => handleDisplay('posts')}
                                  className={`nav-link${user ? '' : ' disabled-link'}`} to="/posts">
                                Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={() => handleDisplay('comments')}
                                  className={`nav-link${user ? '' : ' disabled-link'}`} to="/comments">Comments</Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={() => handleDisplay('todos')}
                                  className={`nav-link${user ? '' : ' disabled-link'}`} to="/todos">Todos</Link>
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
            {user !== null && <Link to="login" className="nav-item nav-link p-3" onClick={handleClick}>
                Logout
            </Link>}


        </nav>
    )
}

export default Navbar;