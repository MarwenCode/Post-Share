import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import axios from "axios"; 

import {
  FiSearch,
  FiUser,
  FiSettings,
  FiMoon,
  FiSun,
  FiHome,
} from "react-icons/fi";

import "./navbar.scss";

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleModalProfile = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSearch = () => {
    // No need to fetch users here, useEffect will handle it
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/user", {
          params: { searchTerm },
        });

        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Fetch users only if searchTerm is not empty
    if (searchTerm.trim() !== "") {
      fetchUsers();
    } else {
      // Clear search results if searchTerm is empty
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <nav className={`navbar ${isDarkTheme ? "dark" : ""}`}>
      <div className="logo">Post & Share</div>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for a friend"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="profile">
        <div className="theme-toggle" onClick={toggleTheme}>
          {isDarkTheme ? <FiSun /> : <FiMoon />}
        </div>
        <Link to="/" className="home-icon">
          <FiHome />
        </Link>
        <div className="profile-icon" onClick={handleModalProfile}>
          <FiUser />
        </div>
        {modalOpen && <Modal closeModal={closeModal} />}
        <div className="settings-icon">
          <FiSettings />
        </div>
      </div>
      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
