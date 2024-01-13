import './App.css';
import UserReducer from "./reducers/UserReducer.tsx";
import ResultsReducer from "./reducers/ResultsReducer.tsx";
import { useReducer } from "react";
import { UserContext, UserDispatchContext } from "./contexts/UserContext.tsx";
import {ResultsContext, ResultsDispatchContext} from "./contexts/ResultsContext.tsx";
import Main from './components/Main.tsx';

function App() {
  
  const initialEmail = localStorage.getItem('email');
  const [email, dispatchEmail] = useReducer(UserReducer, initialEmail);
  const [results, dispatchResults] = useReducer(ResultsReducer, [])

  return (
    <div className="App">
           <UserContext.Provider value={email}>
               <ResultsContext.Provider value={results}>
                   <ResultsDispatchContext.Provider value={dispatchResults}>
                       <UserDispatchContext.Provider value={dispatchEmail}>
                           <Main />
                       </UserDispatchContext.Provider>
                   </ResultsDispatchContext.Provider>
               </ResultsContext.Provider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
