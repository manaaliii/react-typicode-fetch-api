import React, {useContext, useEffect} from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import {UserContext, UserDispatchContext} from "../contexts/userContext.tsx";


const Actions = {
    SET: 'set_user',
    REMOVE: 'remove_user'
}

interface NavbarProps{
    handleDisplay: (input:string)=>void;
}

const Navbar:React.FC<NavbarProps> = ({handleDisplay}) => {
    const user = useContext(UserContext);
    // console.log('hehehe',user, user===null)
    const dispatch = useContext(UserDispatchContext);
    const handleClick = () =>{
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        // console.log(localStorage.getItem('email'));
        dispatch({
            type: Actions.REMOVE,
            payload: {}
        })
        handleDisplay('');
    }

  return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
              <Link className={`navbar-brand${user ? '' : ' disabled-link'}`} onClick={()=>handleDisplay('')} to='/'><HomeIcon /></Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <Link onClick={() => handleDisplay('posts')} className={`nav-link${user ? '' : ' disabled-link'}`} to="/posts">
                              Posts
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link onClick={()=>handleDisplay('comments')} className={`nav-link${user ? '' : ' disabled-link'}`} to="/comments">Comments</Link>
                      </li>
                      <li className="nav-item">
                          <Link onClick={()=>handleDisplay('todos')} className={`nav-link${user ? '' : ' disabled-link'}`} to="/todos">Todos</Link>
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