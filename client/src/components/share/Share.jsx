
import { BsEmojiSmile } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { addPost } from "../../redux/slices/postsSlice";
import "./share.scss";
import { useDispatch, useSelector } from "react-redux";


const Share = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showPicker, setShowPicker] = useState(false);


// const handleAddPost = async () => {
//   try {
//     // Validate description
//     if (!description.trim()) {
//       console.error('Description is required.');
//       return;
//     }

//     // Validate user data
//     if (!user?._id || !user?.username) {
//       console.error('userId and username are required.');
//       return;
//     }

//     // Create FormData object to handle file upload
//     const formData = new FormData();
//     formData.append('desc', description);
//     formData.append('userId', user._id);
//     formData.append('username', user.username);

//     // Check if an image is selected
//     if (picture) {
//       formData.append('file', picture);
//     }

//     // Dispatch the addPost action with the formData
//     const response = await dispatch(addPost(formData));

//     if (response.payload) {
//       console.log('Post added successfully!');
//       // Clear input fields after successful post
//       setDescription('');
//       setPicture(null);
//        setFileName("");
//       document.getElementById('file-upload').value = '';
  
//     } else {
//       console.error('Failed to add post:', response.error);
//     }
//   } catch (error) {
//     console.error('Error adding post:', error);
//   }
// };





const handleAddPost = async () => {
  try {
    // Validate description
    if (!description.trim()) {
      console.error('Description is required.');
      return;
    }

    // Validate user data
    if (!user?._id || !user?.username) {
      console.error('userId and username are required.');
      return;
    }

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('desc', description);
    formData.append('userId', user._id);
    formData.append('username', user.username);

    // Check if an image is selected
    if (picture) {
      formData.append('file', picture);
    }

    // Log FormData object to check contents
    console.log('FormData:', formData);

    // Dispatch the addPost action with the formData
    const response = await dispatch(addPost(formData));

    if (response.payload) {
      console.log('Post added successfully!');
      // Clear input fields after successful post
      setDescription('');
      setPicture(null);
      setFileName('');
      document.getElementById('file-upload').value = '';
    } else {
      console.error('Failed to add post:', response.error);
    }
  } catch (error) {
    console.error('Error adding post:', error);
  }
};



const handlePictureChange = (e) => {
  const file = e.target.files[0];

  // Create an URL from the selected file
  const imageUrl = URL.createObjectURL(file);

  // Update the state to display the image and URL
  setPicture(file);
  setFileName(imageUrl);
};

  const handlePickerClick = () => {
    setShowPicker(!showPicker);
  };

  const EmoticonPicker = () => {
    const emoticons = [
      "😀",
      "😁",
      "😂",
      "🤣",
      "😃",
      "😄",
      "😅",
      "😆",
      "😉",
      "😊",
      "❤️",
      "⭐",
      "🚀",
      "☕",
      "☀️",
      "🍰",
      "🎁",
      "📚",
      "✏️",
      "🎵",
    ];
    return (
      <div className="emoticon-picker">
        {emoticons.map((emoticon, index) => (
          <span
            key={index}
            onClick={() =>
              setDescription((prevDescription) => prevDescription + emoticon)
            }>
            {emoticon}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={`share-container ${isDarkTheme ? "dark" : ""}`}>
      <textarea
        placeholder="Write a sentence..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}></textarea>
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
        {fileName && (
          <img src={fileName} alt="Preview" className="image-preview" />
        )}

        {/* <span className="file-name">{fileName}</span> */}

      
      </div>
    
      <div className="share-actions">
      <div className="picker" onClick={handlePickerClick}>
          <BsEmojiSmile />
          {showPicker && <EmoticonPicker />}
        </div>
       
        <button className="share-button" onClick={handleAddPost}>
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;
