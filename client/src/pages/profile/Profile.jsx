// Profile.jsx

import Share from "../../components/share/Share";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import SuggestedFriends from "./SuggestedFriends";
import OwnPosts from "../../components/ownposts/OwnPosts";
import "./profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { MdPerson } from "react-icons/md";
import { FaMusic, FaHiking, FaUtensils, FaPalette } from "react-icons/fa";

const Profile = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  console.log(user);

  // Define content for My Community section
  const communityCategories = ["Product Designer", "DEVs React JS", "AI"];

  // Define content for Upcoming Events section
  const upcomingEvent = "Upcoming Event: Conference on AI";

  // Define content for Recommendations section
  // Define content for Recommendations section with image URLs
  const recommendations = [
    { name: "Music", icon: <FaMusic color="blue" /> },
    { name: "UX Design", icon: <FaPalette color="purple" /> },
    { name: "Hiking", icon: <FaHiking color="green" /> },
    { name: "Cooking", icon: <FaUtensils color="orange" /> },
  ];

  // Sample data for community
  const communityData = [
    { name: "Product Designer", icon: "🎨", members: 250 },
    { name: "DEVs React JS", icon: "⚛️", members: 500 },
    // Add more community data as needed
  ];

  return (
    <div className={`profile ${isDarkTheme ? "dark" : ""}`}>
      <Share isDarkTheme={isDarkTheme} />

      <div className="content">
        <div className="left">
          <div className="top">
            <div className="profilepic">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" />
              ) : (
                <MdPerson size={80} color="#555" />
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

        <div className="center">
          <OwnPosts />
        </div>

        <div className="right">
        
          <div className="community-section">
            <h3>My Community</h3>
            <ul>
              {communityData.map((community, index) => (
                <li key={index}>
                  <span>{community.icon}</span>
                  <span>{community.name}</span>
                  <span>{community.members} members</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="event-section">
            <h3>Upcoming Events</h3>
            <p>{upcomingEvent}</p>
          </div>

          <div className="recommendation-section">
            <h3>Recommendations</h3>
            <div className="recommendation-list">
              {recommendations.map((item, index) => (
                <div key={index} className="recommendation-item">
                  {item.icon}
              
                </div>
              ))}
            </div>
           
          
          </div>

          <div className="friends">
            <SuggestedFriends />

            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
