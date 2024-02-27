import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./modaleditpost.scss"
import { editPost, fetchPosts } from "../../redux/slices/postsSlice";

const ModalEditPost = ({ onClose, postId, initialText }) => {
    const dispatch = useDispatch();
    const [editedText, setEditedText] = useState({ text: initialText });

  const saveEditPost = async () => {
    try {
        await dispatch((editPost({postId, updatedText: editedText.text})));
        await dispatch((fetchPosts));
        onClose()

    } catch (error) {
        console.error("Error editing post:", error);
        
    }
   
  };

  const handleCancel = () => {
   
    onClose();
  };

 
    return (
        <div className="modal-post">
          <div className="modal-content">
            <h2>Edit Post</h2>
            <textarea
              className="textarea"
              value={editedText.text}
              onChange={(e) => setEditedText({ text: e.target.value })}
             
            />
            <div className="button-container">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-button" onClick={saveEditPost}>
                Save
              </button>
            </div>
          </div>
        </div>
      );
};

export default ModalEditPost;
