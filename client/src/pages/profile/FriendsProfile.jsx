import React from "react";

import Share from "../../components/share/Share";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";

const FriendsProfile = () => {
  return (
    <div>
      <Navbar />
      <Share />
      <div className="profile-sidebar-content"></div>

      <div className="profile-posts"></div>
    </div>
  );
};

export default FriendsProfile;
