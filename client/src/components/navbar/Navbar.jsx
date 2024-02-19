import  { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";

import { FiSearch, FiUser, FiSettings, FiMoon, FiSun, FiHome } from "react-icons/fi";

import "./navbar.scss";

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);



  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleModalProfile = () => {
    setModalOpen(true);
  
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <nav className={`navbar ${isDarkTheme ? "dark" : ""}`}>
      <div className="logo">
        Post & Share
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
    </nav>
  );
};

export default Navbar;