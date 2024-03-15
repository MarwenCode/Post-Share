import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FiSearch,
  FiUser,
  FiSettings,
  FiMoon,
  FiSun,
  FiHome,
} from 'react-icons/fi';
import './navbar.scss';
import ModalEditProfile from './ModalEditProfile';
import Modal from "../modal/Modal"
const Navbar = ({ toggleTheme, isDarkTheme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  const [modalEditProfileOpen, setModalEditProfileOpen] = useState(false);

  const handleModalEditProfile = () => {
    setModalEditProfileOpen(true);
    console.log('test clic');
  };

  const closeModalEditProfile = () => {
    setModalEditProfileOpen((prev) => !prev);
  };

  const handleModalProfile = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  }, [searchTerm, users]);

  const handleRedirectToProfile = (userId) => {
    navigate(`/user/${userId}`);
    setFilteredUsers([]);
  };

  return (
    <nav className={`navbar ${isDarkTheme ? 'dark' : ''}`}>
      <div className="logo">Post & Share</div>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for a friend"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
        <div className="settings-icon" onClick={handleModalEditProfile}>
          <FiSettings />
        </div>
        {modalEditProfileOpen && (
          <ModalEditProfile closeModal={closeModalEditProfile} />
        )}
      </div>
      {/* Display search results */}
      {searchTerm !== '' && filteredUsers.length > 0 && (
        <div className="search-results">
          <ul>
            {filteredUsers.map((user) => {
              if (
                user.username !== searchTerm &&
                user.username !==
                  JSON.parse(localStorage.getItem('user')).username
              ) {
                return (
                  <li
                    key={user._id}
                    onClick={() => handleRedirectToProfile(user._id)}
                  >
                    {user.username}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

