import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';

import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [errorMessageAll, setErrorMessageAll] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
  
    console.log("Inside handleLogin");
  
    // Reset validation errors
    setEmailError("");
    setPasswordError("");
    setErrorMessageAll("");
    setLoginSuccess(false);
  
    // Check if all fields are empty
    if (!email || !password) {
      setErrorMessageAll("All fields are required");
      return;
    }
  
    // Simple email validation
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
  
    // Dispatch the loginUser async thunk
    try {
      const response = await dispatch(loginUser({ email, password }));
      console.log("Response status:", response.payload.status);
      console.log("Response data:", response.payload.data);
  
      // Check the response status
      if (!response.error) {
        // Set login success state to true
        setLoginSuccess(true);
  
        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(response.payload.data));
        console.log("Before navigate");
        navigate("/");
        console.log("Navigation attempt");
      } else {
        // Handle login error and set appropriate error messages
        const data = response.payload.data;
        if (data === "wrong email") {
          setEmailError("Wrong email");
        } else if (data === "wrong password") {
          setPasswordError("Wrong password");
        } else {
          setErrorMessageAll(data);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Set login success state to false
      setErrorMessageAll('Login failed. Please try again.');
    }
  };
  


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <span className="loginDesc">Make a touch & connect everywhere.</span>
          <p>
            Do not have an account?
            <Link to="/register" className="link">
              <span
              
              >
                &nbsp; Register
              </span>
            </Link>
          </p>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              className={`loginInput ${errorMessageAll && 'error'}`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="errorText">{emailError}</div>}
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              className={`loginInput ${errorMessageAll && 'error'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="errorText">{passwordError}</div>}

            <button className="loginButton" type="submit">
              Login
            </button>

            {/* Display success or error message based on loginSuccess state */}
            {loginSuccess && (
              <span style={{ color: "green" }}>Login successful! You are already logged in.</span>
            )}
            {!loginSuccess && errorMessageAll && (
              <div className="errorText">{errorMessageAll}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
