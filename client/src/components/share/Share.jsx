import { BsEmojiSmile } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import Picker from "emoji-picker-react";
import { addPost,fetchPosts } from "../../redux/slices/postsSlice";
import "./share.scss";
import { useDispatch, useSelector } from "react-redux";

const Share = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);


  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleAddPost = async () => {
    try {
      // Ensure that required data is available
      if (!description || !user._id || !user.username) {
        console.error("Description, userId, and username are required.");
        return;
      }
  
      // Create a plain object to send as the request body
      const postData = {
        desc: description,
        userId: user._id,
        username: user.username,
      };
  
      // Dispatch the addPost action
      await dispatch(addPost(postData));
  
      // Clear input fields after successful post
      setDescription("");
      setPicture(null);
      setFileName("");

       // Dispatch the fetchPosts action to refresh the posts data
       await dispatch(fetchPosts());
  
      console.log("Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };



  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setFileName(file.name);
  };

  const handlePickerClick = () => {
    setShowPicker(!showPicker);
  };

  const onEmojiClick = (event, emojiObject) => {
    setDescription((prevDescription) => prevDescription + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="share-container">
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
          accept="image/*"
          onChange={handlePictureChange}
        />
        <span className="file-name">{fileName}</span>
      </div>
      <div className="share-actions">
        <div className="picker" onClick={handlePickerClick}>
          <BsEmojiSmile />
          {showPicker && (
            <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
          )}
        </div>
        <button className="share-button" onClick={handleAddPost}>
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;
