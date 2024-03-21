// FriendsProfile.jsx

import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../redux/slices/followSlice";

import "./friendsprofile.scss";
import { MdPerson } from "react-icons/md";
import SuggestedFriends from "./SuggestedFriends";
import Trendings from "./Trendings";

const FriendsProfile = ({isDarkTheme}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.data);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  console.log(id);
  console.log(id);



  const handleFollow = () => {
    // Vous devrez ajuster ces actions en fonction de la structure exacte de votre Redux store
    if (isFollowing) {
      dispatch(unfollow(id));
    } else {
      dispatch(follow(id));
    }

    setIsFollowing(!isFollowing);

    setShowStars(true);
    setTimeout(() => {
      setShowStars(false);
    }, 2000);
  };


  return (
    <div className="friendsprofile">
      <Share  isDarkTheme={isDarkTheme}  />
      <div className="content">
        <div className="leftSidebar">
          <div className="top">
            <div className="profilepic">
              {/* <MdPerson size={80} color="#555" /> */}
              <img src="../assets/test.jpg" alt="Profile" />
            </div>

            <div className="follow">
              <button onClick={handleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>

              {/* Display stars only when isFollowing is true */}
              {showStars && isFollowing && (
                <div className="stars-container">
                  {/* Create 3 stars */}
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="star">
                      🌟
                    </div>
                  ))}
                </div>
              )}
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

        <div className="rightSidebar">
          <div className="trending">
          <Trendings />

          </div>
        

          <div className="friendsList">
            <SuggestedFriends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsProfile;
