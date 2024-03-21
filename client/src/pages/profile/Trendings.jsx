import React, { useEffect, useRef } from 'react';
import "./trendings.scss"

const Trendings = ({isDarkTheme}) => {
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

  
  const scrollSpeed = 10; 
  const scrollDirection = 'up';

  const trendingListRef = useRef(null);

  const handleAutoScroll = () => {
    const trendingList = trendingListRef.current;
    if (trendingList) {
      const scrollAmount = scrollDirection === 'up' ? -scrollSpeed : scrollSpeed;
      trendingList.scrollTop += scrollAmount;

      // Check if the last item is visible
      const lastItem = trendingList.lastElementChild;
      const isLastItemVisible = lastItem.getBoundingClientRect().bottom <= trendingList.clientHeight;

      // If the last item is visible, move it to the top of the list
      if (isLastItemVisible) {
        const firstItem = trendingList.firstChild;
        trendingList.insertBefore(lastItem, firstItem);
      }

      // Check if the first item is hidden
      const firstItem = trendingList.firstChild;
      const isFirstItemHidden = firstItem.getBoundingClientRect().top < 0;

      // If the first item is hidden, move it to the bottom of the list
      if (isFirstItemHidden) {
        const lastItem = trendingList.lastElementChild;
        trendingList.insertBefore(firstItem, lastItem);
      }

      // // Move the first item to the end of the list
      const firstIte = trendingList.firstChild;
      trendingList.appendChild(firstItem);

      // Swap the first and second items
      const secondItem = trendingList.children[1];
      trendingList.insertBefore(secondItem, firstIte);

      // Swap the last and second to last items
      const secondToLastItem = trendingList.children[trendingList.children.length - 2];
      trendingList.insertBefore(secondToLastItem, lastItem);
    }
  };

  // Use setInterval to automatically scroll
  useEffect(() => {
    const intervalId = setInterval(handleAutoScroll, 2500); // Adjust the interval time as needed
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
 
         <div className={`trending ${isDarkTheme ? "dark" : ""}`}>
      <h2>Today Trending </h2>
      <ul id="trendingList" ref={trendingListRef}>
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