// Profile.jsx

import Share from "../../components/share/Share";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import SuggestedFriends from "./SuggestedFriends";
import OwnPosts from "../../components/ownposts/OwnPosts";

const Profile = () => {
  return (
    <div>
      
      <Navbar />
      <Share />
      <div className="profile-sidebar-content">
       
       <SuggestedFriends />
     
     </div>
     
        <div className="profile-posts">
    
          <OwnPosts />
        </div>
      
      
    </div>
  );
};

export default Profile;
