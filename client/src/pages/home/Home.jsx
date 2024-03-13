import Navbar from "../../components/navbar/Navbar";
import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";
import Stories from "../../components/stories/Stories";
import "./home.scss";
import Trendings from "../profile/Trendings";
import SuggestedFriends from "../profile/SuggestedFriends";
import Socials from "../../components/socials/Socials";

const Home = () => {


 
  return (
    <div className="home">
      <Navbar />
      <div className="content">
        <div className="left">
          <div className="top">
          <Stories />

          </div>

          <div className="down">
            <Socials />
          </div>
         
        </div>
        <div className="center">
          <Share />
          <Posts />
        </div>
        <div className="right">
          <div className="top">
          < Trendings />

          </div>
          <div className="down">
          <SuggestedFriends />

          </div>
      
      
        </div>
      </div>
    </div>
  );
};

export default Home;
