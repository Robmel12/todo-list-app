
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";
import './App.css';
//components
import UserLogin from './components/UserLogin/UserLogin'; 
import UserTodos from "./components/UserTodos/UserTodos";
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<UserLogin/>}/>
        <Route exact path="/todos"element={<UserTodos/>}/>
      </Routes>
      </Router>
      </>
  );
}

export default App;
