import React, { useState, useEffect } from 'react';
import { MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import './stories.scss';

const Stories = () => {
  const user = useSelector((state) => state.user.data);
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User data for each image
  const usersData = [
    { name: 'John Doe', photo: 'https://source.unsplash.com/random/50x50?user1' },
    { name: 'Jane Smith', photo: 'https://source.unsplash.com/random/50x50?user2' },
    // Add more user data as needed
  ];

  // Liste de 10 images d'Unsplash (remplacez les URL par celles que vous souhaitez utiliser)
  const unsplashImageList = [
    'https://source.unsplash.com/random/800x600?1',
    'https://source.unsplash.com/random/800x600?2',
    'https://source.unsplash.com/random/800x600?3',
    'https://source.unsplash.com/random/800x600?4',
    'https://source.unsplash.com/random/800x600?5',
    'https://source.unsplash.com/random/800x600?6',
    'https://source.unsplash.com/random/800x600?7',
    'https://source.unsplash.com/random/800x600?8',
    'https://source.unsplash.com/random/800x600?9',
    'https://source.unsplash.com/random/800x600?10',
  ];

  useEffect(() => {
    let intervalId;

    if (modalVisible) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);

        if (progress >= 15) {
          // Reset progress and move to the next set of 3 images
          setProgress(0);
          setCurrentIndex((prevIndex) => (prevIndex + 3) % unsplashImageList.length);
        }
      }, 1000);

      // Close the modal after 15 seconds
      setTimeout(() => {
        setModalVisible(false);
      }, 15000);
    }

    // Clear the interval when the component is unmounted or the modal is closed
    return () => clearInterval(intervalId);
  }, [modalVisible, progress, currentIndex]);

  const openModal = () => {
    setModalVisible(true);
  };


  

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleImageClick = () => {
    openModal();
  };

  return (
    <div className='stories'>
      <div className='story-container'>
        {unsplashImageList.slice(currentIndex, currentIndex + 3).map((imageUrl, index) => (
          <div key={index} className='story-item'>
            <img
              src={imageUrl}
              alt={`Story ${index + 1}`}
              onClick={handleImageClick}
            />
            <div className='overlay'>
            {user.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" />
              ) : (
                <MdPerson size={80} color="#555" />
              )}
              <span>{user.username}</span>
            
            </div>
          </div>
        ))}
      </div>

      {/* Modal with progress bar */}
      {modalVisible && (
        <div className='modal'>
           
          <div className='progress-bar' style={{ width: `${(progress / 12) * 100}%` }} />
          <div className='modal-content'>
            {/* Image to display in the modal */}
            <img
              src={unsplashImageList[currentIndex]}
              alt='Selected Story'
              // style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <button className="close-button" onClick={closeModal}>X</button>
        </div>
      )}
    </div>
  );
};

export default Stories;
