
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

  const [userId, setUserId] = useState({
    userStatus:null,
    user:null,
    message: ''
  })
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<UserLogin userId={userId} setUserId={setUserId}/>}/>
        <Route exact path="/todos"element={<UserTodos userId={userId}/>}/>
      </Routes>
      </Router>
      </>
  );
}

export default App;
