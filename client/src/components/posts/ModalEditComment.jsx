// ModalEditComment.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts, editComment } from "../../redux/slices/postsSlice";
import "./modaleditcomment.scss";

const ModalEditComment = ({ onClose, postId, commentId, initialText }) => {
  const dispatch = useDispatch();
  const [editedText, setEditedText] = useState({ text: initialText });

  const saveEditComment = async () => {
    try {
      await dispatch(editComment({ commentId, updatedText: editedText.text }));
      await dispatch(fetchPosts());
      onClose(); // Close the modal after saving the edit
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
    <div className="modal-edit-comment">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>

        <textarea
          type="text"
          value={editedText.text}
          onChange={(e) => setEditedText({ text: e.target.value })}
        />
        <div className="button">
          <button onClick={saveEditComment}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditComment;


