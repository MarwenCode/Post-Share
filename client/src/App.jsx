
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import FriendsProfile from './pages/profile/FriendsProfile';
import { useDispatch, useSelector } from "react-redux";
import './app.scss';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Save the theme preference to localStorage
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
  };

  useEffect(() => {
    // Load the theme preference from localStorage on component mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
    }
  }, [dispatch]);

  return (
    <Router>
      <div className={`container ${isDarkTheme ? 'dark' : ''}`}>
        {user && <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />}
   
        <Routes>
          {/* Utilisez une expression ternaire pour afficher la page d'accueil ou la page d'inscription en fonction de l'état de connexion de l'utilisateur */}
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home isDarkTheme={isDarkTheme} />} />
          <Route path="/profile" element={<Profile isDarkTheme={isDarkTheme} />} />
          <Route path="/user/:id" element={<FriendsProfile isDarkTheme={isDarkTheme} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
