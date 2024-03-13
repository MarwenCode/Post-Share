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

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  console.log(user)

  return (
    <div className="profile">
      <Navbar />
      <Share />

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
          <SuggestedFriends />
        </div>
      </div>
    </div>
  );
};

export default Profile;
