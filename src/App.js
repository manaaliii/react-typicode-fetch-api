import './App.css';
<<<<<<< HEAD
import UserReducer from "./reducers/UserReducer.tsx";
import ResultsReducer from "./reducers/ResultsReducer.tsx";
import { useReducer } from "react";
import { UserContext, UserDispatchContext } from "./contexts/UserContext.tsx";
import {ResultsContext, ResultsDispatchContext} from "./contexts/ResultsContext.tsx";
=======
import userReducer from "./reducers/userReducer.tsx";
import { useReducer } from "react";
import { UserContext, UserDispatchContext } from "./contexts/userContext.tsx"; 
>>>>>>> 0afaeb05ab94400e80e6505f10df172b0349e4af
import Main from './components/Main.tsx';

function App() {
  
  const initialEmail = localStorage.getItem('email');
<<<<<<< HEAD
  const [email, dispatchEmail] = useReducer(UserReducer, initialEmail);
  const [results, dispatchResults] = useReducer(ResultsReducer, [])
=======
  const [email, dispatch] = useReducer(userReducer, initialEmail);
>>>>>>> 0afaeb05ab94400e80e6505f10df172b0349e4af

  return (
    <div className="App">
           <UserContext.Provider value={email}>
<<<<<<< HEAD
               <ResultsContext.Provider value={results}>
                   <ResultsDispatchContext.Provider value={dispatchResults}>
                       <UserDispatchContext.Provider value={dispatchEmail}>
                           <Main />
                       </UserDispatchContext.Provider>
                   </ResultsDispatchContext.Provider>
               </ResultsContext.Provider>
=======
            <UserDispatchContext.Provider value={dispatch}>

             <Main />

            </UserDispatchContext.Provider>
>>>>>>> 0afaeb05ab94400e80e6505f10df172b0349e4af
        </UserContext.Provider>
    </div>
  );
}

export default App;
