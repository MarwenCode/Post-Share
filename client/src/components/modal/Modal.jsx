import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import "./modal.scss"

const Modal = ({closeModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Dispatch clearUser action to remove user data from the Redux store
    dispatch(clearUser());
    // Implement any additional sign-out logic (e.g., redirect to login page)
    navigate('/register');
    console.log('Signing out...');
  };

  const handleProfileClick = () => {
    // Implement your profile click logic here
    navigate('/profile');
    console.log("Navigating to user's profile...");
  };

  const handleClose = () => {
    closeModal(false)
  };


  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="profile-line" onClick={handleProfileClick}>
            Profile
          </div>
          <div className="signout-line" onClick={handleSignOut}>
            Sign Out
          </div>
        </div>
        <div className="modal-close" onClick={handleClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Modal;