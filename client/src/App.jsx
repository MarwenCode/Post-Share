import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from './redux/slices/userSlice';
import Navbar from './components/navbar/Navbar';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import FriendsProfile from './pages/profile/FriendsProfile';
import './app.scss';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
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
      <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <Routes>
          <Route path="/" element={<Home isDarkTheme={isDarkTheme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile  isDarkTheme={isDarkTheme}  />} />
          <Route path="/user/:id" element={<FriendsProfile  isDarkTheme={isDarkTheme} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


