import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MdPerson, MdExpandMore, MdExpandLess } from "react-icons/md";
import "./suggestedfriends.scss";

const SuggestedFriends = ({isDarkTheme}) => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [showFullList, setShowFullList] = useState(false); // Initialiser l'état à false

  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/user");
        const connectedUserId = user?._id;
        
        // Filter out the connected user from the suggested friends
        const filteredFriends = response.data.filter(
          (friend) => friend._id !== connectedUserId
        );

        setSuggestedFriends(filteredFriends);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user]);

  const toggleFullList = () => {
    setShowFullList(!showFullList); // Inverser l'état de showFullList
  };

  return (
 
         <div className={`suggested-friends-container ${isDarkTheme ? "dark" : ""}`}>
      <button className="expand-button" onClick={toggleFullList}>
        {showFullList ? <MdExpandLess className="expand-icon" /> : <MdExpandMore className="expand-icon" />}
        <span>{showFullList ? "Hide Friends" : "Show All Friends"}</span>
      </button>
      <ul className={`friends ${showFullList ? 'show' : ''}`}>
        {suggestedFriends.map((friend) => (
          <li key={friend._id} className="friend">
            {friend.profilePicture ? (
              <img
                src={friend.profilePicture}
                alt={`Profile of ${friend.username}`}
              />
            ) : (
              <MdPerson size={40} color="#555" />
            )}
            <div className="info">
              <span>{friend.username}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedFriends;
