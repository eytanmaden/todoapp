import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Context from './context/Context';
import { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage';
import AddToDo from './components/AddToDo';
import EditToDo from './components/EditToDo';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const data = window.localStorage.getItem('user');
    if( data !== null) setCurrentUser(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser])
  
  

  return (
    <div className="App">
      <Context.Provider
        value={{
          currentUser: currentUser,
          setCurrentUser: setCurrentUser,
          currentTodo: currentTodo,
          setCurrentTodo: setCurrentTodo,
        }}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/todos" element={<LandingPage />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/add-todos" element={<AddToDo />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/edit-todos" element={<EditToDo />} />
            </Route>
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}


export default App;
