import { BsEmojiSmile } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { FcFolder } from "react-icons/fc";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import Picker from "emoji-picker-react";
import "./share.scss";

const Share = () => {
  const [inputStr, setInputStr] = useState("");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showPicker, setShowPicker] = useState(false);



  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setFileName(file.name);
  };

  const handleShare = () => {
    // Implement your share logic here
    console.log("Sharing the post...");
 
    console.log("Picture:", picture);
  };

  const handlePickerClick = () => {
    setShowPicker(!showPicker);
  };

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="share-container">
      <textarea
        placeholder="Write a sentence..."
      
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
                <Picker
                  pickerStyle={{ width: "100%" }}
                  onEmojiClick={onEmojiClick}
                />
              )}
        </div>
        <button className="share-button" onClick={handleShare}>
         
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;