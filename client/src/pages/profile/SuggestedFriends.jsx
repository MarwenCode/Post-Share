import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MdPerson } from "react-icons/md";
import "./suggestedfriends.scss";

const SuggestedFriends = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
 // Ajouter cette ligne pour le débogage

  const user = useSelector((state) => state.user.data);
  console.log(user)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/user");
        const connectedUserId = user._id;
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

  
  
  
  
  

  return (
    <div className="suggested-friends-container">
      <h2> Friends</h2>
      <ul>
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
