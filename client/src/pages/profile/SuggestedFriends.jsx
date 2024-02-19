// SuggestedFriends.jsx
import React from 'react';
import "./suggestedfriends.scss"

const SuggestedFriends = () => {
  // Example data for suggested friends
  const suggestedFriends = [
    { id: 1, name: 'Friend 1', profilePic: 'url-to-image' },
    { id: 2, name: 'Friend 2', profilePic: 'url-to-image' },
    { id: 3, name: 'Friend 3', profilePic: 'url-to-image' },
    // Add more suggested friends as needed
  ];

  return (
    <div className="suggested-friends-container">
      <h2>Suggested Friends</h2>
      <ul>
        {suggestedFriends.map((friend) => (
          <li key={friend.id} className="friend">
            <img src={friend.profilePic} alt={`Profile of ${friend.name}`} />
            <span>{friend.name}</span>
        
            <button>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedFriends;
