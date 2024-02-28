import Share from "../../components/share/Share";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import SuggestedFriends from "./SuggestedFriends";
import { useLocation, useParams } from "react-router-dom";

const FriendsProfile = () => {


  const location = useLocation();
  console.log(location);
  const path = location.pathname.split("/")[2];
  console.log(path);

  return (
    <div>
      <Navbar />
      <Share />
      <div className="profile-sidebar-content">
        <SuggestedFriends />
      </div>
      <div className="profile-posts">
        <Posts visitedUserId={path} />
      </div>
    </div>
  );
};

export default FriendsProfile;
