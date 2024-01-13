import './App.css';
import UserReducer from "./reducers/UserReducer.tsx";
import { useReducer } from "react";
import { UserContext, UserDispatchContext } from "./contexts/UserContext.tsx";
import { ResultsContext, ResultsDispatchContext } from './contexts/ResultsContext.tsx'; 
import Main from './components/Main.tsx';
import ResultsReducer from './reducers/ResultsReducer.tsx';

function App() {
  
  const initialEmail = localStorage.getItem('email');
  const [email, dispatchEmail] = useReducer(UserReducer, initialEmail);
  const [results, dispatchResults] = useReducer(ResultsReducer, []);
  

  return (
    <div className="App">
           <UserContext.Provider value={email}>
            <UserDispatchContext.Provider value={dispatchEmail}>
            <ResultsContext.Provider value={results}>
              <ResultsDispatchContext.Provider value={dispatchResults}>

             <Main />
             </ResultsDispatchContext.Provider>
            </ResultsContext.Provider>
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
