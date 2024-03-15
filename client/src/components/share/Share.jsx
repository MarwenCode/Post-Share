import { BsEmojiSmile } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import Picker from "emoji-picker-react";
import { addPost, fetchPosts } from "../../redux/slices/postsSlice";
import "./share.scss";
import { useDispatch, useSelector } from "react-redux";

const Share = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showPicker, setShowPicker] = useState(false);


  const handleAddPost = async () => {
    try {
      // Ensure that required data is available
      if (!description || !user?._id || !user?.username) {
        console.error("Description, userId, and username are required.");
        return;
      }
  
      // Create a plain object to send as the request body
      const postData = {
        desc: description,
        userId: user?._id,
        username: user?.username,
        img: picture, // Use the same key as in your postsSlice.js
      };
  
      // Dispatch the addPost action
      const response = await dispatch(addPost(postData));
  
      // Check if the post was added successfully
      if (response.payload) {
        const imageUrl = response.payload.img; // Assuming the response structure, adjust as needed
        console.log("Post added successfully!");
  
        // Do something with the imageUrl, e.g., update state or UI
        // For simplicity, you can log it for now
        console.log("Image URL:", imageUrl);
  
        // Clear input fields after successful post
        setDescription("");
        setPicture(null);
        setFileName("");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  
  

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    // Verify that all necessary data is available
    if (!file || !user?._id || !user?.username) {
      console.error("File, userId, and username are required.");
      return;
    }

    // Create an URL from the selected file
    const imageUrl = URL.createObjectURL(file);

    // Update the state to display the image and URL
    setPicture(file);
    setFileName(imageUrl);
  };
  const handlePickerClick = () => {
    setShowPicker(!showPicker);
  };

  const onEmojiClick = (event, emojiObject) => {
    setDescription((prevDescription) => prevDescription + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className={`share-container ${isDarkTheme ? 'dark' : ''}`}>
      <textarea
        placeholder="Write a sentence..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="file-input">
        <label htmlFor="file-upload">
          <FaImage />
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".png,.jpeg,.jpg"
          onChange={handlePictureChange}
        />

        {/* Affichez l'image sélectionnée */}
        {fileName && <img src={fileName} alt="Preview" className="image-preview" />}

        <span className="file-name">{fileName}</span>
      </div>
      <div className="share-actions">
        <div className="picker" onClick={handlePickerClick}>
          {/* <BsEmojiSmile />
          {showPicker && (
            <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
          )} */}
        </div>
        <button className="share-button" onClick={handleAddPost}>
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;
