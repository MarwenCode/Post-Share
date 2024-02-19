
import Navbar from "../../components/navbar/Navbar";
import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";

const Home = () => {
  return (
    <>
      <div>
      
        <Navbar />
      </div>
      <div>
       
        <Share />
      </div>
      <div>
       
        <Posts />
      </div>
    </>
  );
};

export default Home;
