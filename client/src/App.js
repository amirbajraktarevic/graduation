import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/Navbar";
import { createContext, useReducer } from "react";
import Routing from "./components/Routing";
import { initialState, reducer } from "./reducers/userReducer";
export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <NavBar className="navbar" />
          <Routing className="navbar" />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
