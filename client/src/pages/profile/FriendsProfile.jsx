// FriendsProfile.jsx

import Share from "../../components/share/Share";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../redux/slices/followSlice";
import {
  loadUserById,
  loadUserFromLocalStorage,
} from "../../redux/slices/userSlice";

import "./friendsprofile.scss";
import { MdPerson } from "react-icons/md";

const FriendsProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [visitedUser, setVisitedUser] = useState(null);
  const currentUser = useSelector((state) => state.user.data);
  const [isFollowing, setIsFollowing] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    // Load user details based on ID
    dispatch(loadUserById(id))
      .then((resultAction) => {
        if (loadUserById.fulfilled.match(resultAction)) {
          setVisitedUser(resultAction.payload);
        }
      })
      .catch((error) => {
        console.error("Error loading user by ID:", error);
      });
  }, [dispatch, id]); // Remove currentUser from dependencies

  useEffect(() => {
    // Check if the logged-in user already follows the visited user
    setIsFollowing(
      visitedUser &&
        currentUser &&
        visitedUser.followings.includes(currentUser._id)
    );
  }, [visitedUser, currentUser]); // Update this line

  const handleFollow = () => {
    // You'll need to adjust these actions based on the exact structure of your Redux store
    if (isFollowing) {
      dispatch(unfollow(id));
    } else {
      dispatch(follow(id));
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="friendsprofile">
      <Navbar />
      <Share />
      <div className="profile-sidebar-content">
        <div className="top">
          <div className="profilepic">
            <MdPerson size={80} color="#555" />
          </div>

          <div className="follow">
            <button onClick={handleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>

        <div className="intro">
          <div className="items">
          <div className="item">
              <span className="logo">🎓</span> 
              <p>School name</p>
            </div>
            <div className="item">
              <span className="logo">💼</span>
              <p>Work</p>
            </div>
            <div className="item">
              <span className="logo">🌆</span>
              <p>City</p>
            </div>
            <div className="item">
              <span className="logo">🌆</span>
              <p>joined since</p>
            </div>
          
          </div>
        </div>
      </div>
      <div className="profile-posts">
        <Posts visitedUserId={path} />
      </div>
    </div>
  );
};

export default FriendsProfile;
