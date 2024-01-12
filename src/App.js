import './App.css';
import userReducer from "./reducers/userReducer.tsx";
import { useReducer } from "react";
import { UserContext, UserDispatchContext } from "./contexts/userContext.tsx"; 
import Main from './components/Main.tsx';

function App() {
  
  const initialEmail = localStorage.getItem('email');
  const [email, dispatch] = useReducer(userReducer, initialEmail);

  return (
    <div className="App">
           <UserContext.Provider value={email}>
            <UserDispatchContext.Provider value={dispatch}>

             <Main />

            </UserDispatchContext.Provider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
