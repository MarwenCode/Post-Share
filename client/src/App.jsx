import React,{useEffect}from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./app.scss"
import FriendsProfile from "./pages/profile/FriendsProfile";
import { useDispatch } from "react-redux";
import { loadUserFromLocalStorage, loadUserById } from "./redux/slices/userSlice";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage during app startup
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);
 
  



  return (
    <Router>
      <div className="container">
        <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/user/:id" element={ <FriendsProfile />} />
     
        </Routes>
      </div>
    </Router>
  );
}

export default App;

