import React, {useEffect} from 'react';
import "./trendings.scss"

const Trendings = () => {
  const trendingTopics = [
    { topic: "#ReactJS", posts: 150 },
    { topic: "#WebDevelopment", posts: 120 },
    { topic: "#DigitalArt", posts: 80 },
    { topic: "#HealthyLiving", posts: 200 },
    { topic: "#TechNews", posts: 100 },
    { topic: "#TechNews", posts: 100 },
    { topic: "#TechNews", posts: 100 },
    { topic: "#TechNews", posts: 100 },
  ];

  // You can adjust the scroll speed and direction as needed
  const scrollSpeed = 2; // Change to your desired scroll speed (higher values are slower)
  const scrollDirection = 'up'; // Change to 'down' for downward scroll

  const handleAutoScroll = () => {
    const trendingList = document.getElementById('trendingList');
    if (trendingList) {
      const scrollAmount = scrollDirection === 'up' ? -scrollSpeed : scrollSpeed;
      trendingList.scrollTop += scrollAmount;
    }
  };

  // Use setInterval to automatically scroll
useEffect(() => {
    const intervalId = setInterval(handleAutoScroll, 100); // Adjust the interval time as needed
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="trending">
      <h2>Today Trending </h2>
      <ul id="trendingList">
  {trendingTopics.map((topic, index) => (
    <li key={index}>
      {topic.topic} - {topic.posts} posts
    </li>
  ))}
</ul>

    </div>
  );
};

export default Trendings;
