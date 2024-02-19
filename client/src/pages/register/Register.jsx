import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useDispatch } from 'react-redux';
import { loginUser, clearUser, setError  } from '../../redux/slices/userSlice';


const Register = () => {
    const dispatch = useDispatch();
  
    const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordAgainError, setPasswordAgainError] = useState("");
  const [errorMessageAll, setErrorMessageAll] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  
    const handleRegister = async (e) => {
      e.preventDefault();

      // Check if all fields are empty
    if (!username && !email && !password && !passwordAgain) {
        setErrorMessageAll("All fields are required");
        return;
      }
  
      // Clear any existing error messages
      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      setPasswordAgainError("");
      setErrorMessageAll("");
  
      // Simple validation
      if (username.length < 4) {
        setUsernameError("Username must be at least 3 characters");
        return;
      }
  
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
        return;
      }
  
      // Simple password validation (at least 6 characters)
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      }
  
      // Check if passwords match
      if (passwordAgain !== password) {
        setPasswordAgainError("Passwords do not match");
        return;
      }
  
      try {
        // Make your API request here
        const response = await fetch('https://social-media-app-vp1y.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, passwordAgain }),
        });
  
        const data = await response.json();

        if (response.ok) {
          dispatch(loginUser(data));
          dispatch(setSuccessMessage('Profile created successfully! click on Login'));
        } else {
          dispatch(clearUser());
          dispatch(setError(data.error));
        }
      } catch (error) {
        console.error('Error during registration:', error);
        dispatch(clearUser());
        dispatch(setError('Registration failed. Please try again.'));
      }
    };

    return (
        <div className="register">
          <div className="loginWrapper">
            <div className="loginLeft">
              <span className="loginDesc">Make a touch & connect every where.</span>
              <p>
                Already have an account?
                <Link to="/login" className="link">
                  <span
                    style={{
                      textDecoration: "none",
                      color: "#1c7ed6",
                    }}>
                    &nbsp; Login
                  </span>
                </Link>
              </p>
            </div>
            <div className="loginRight">
            {successMessage && <span style={{ color: 'green' }}>{successMessage}</span>}
              <form className="loginBox" onSubmit={handleRegister}>
                <input
                  placeholder="Username"
                  className={`loginInput ${errorMessageAll && 'error'}`}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && <div style={{ color: "red" }}>{usernameError}</div>}
                <input
                  placeholder="Email"
                  type="email"
                  className={`loginInput ${errorMessageAll && 'error'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div style={{ color: "red" }}>{emailError}</div>}
                <input
                  placeholder="Password"
                  type="password"
                  className={`loginInput ${errorMessageAll && 'error'}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
                <input
                  placeholder="Confirm Password"
                  className={`loginInput ${errorMessageAll && 'error'}`}
                  type="password"
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
                {passwordAgainError && <div style={{ color: "red" }}>{passwordAgainError}</div>}
    
                <button className="loginButton" type="submit">
                  Sign in
                </button>
    
                {errorMessageAll && <div style={{ color: "red" }}>{errorMessageAll}</div>}
              </form>
            </div>
          </div>
        </div>
      );
}

export default Register