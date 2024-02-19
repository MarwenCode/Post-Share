import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./app.scss"


function App() {
 
 


  return (
    <Router>
      <div className="container">
        <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={ <Profile />} />
     
        </Routes>
      </div>
    </Router>
  );
}

export default App;

