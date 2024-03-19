import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../../redux/slices/userSlice";
import Loader from "./Loader";
import "./modaleditprofile.scss";

const ModalEditProfile = ({ closeModal, userId }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data);
  const [editedData, setEditedData] = useState({
    username: user.username || "",
    password: "",
    email: user.email || "",
    profilePicture: user.profilePicture || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEditedData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedData((prevData) => ({ ...prevData, profilePicture: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("file", editedData.profilePicture);
    data.append("upload_preset", "uploads");

    try {
      const uploadFiles = await axios.post(
        "https://api.cloudinary.com/v1_1/djzv6xzgd/image/upload",
        data
      );

      const { url } = uploadFiles.data;

      const updateData = {
        userId: user._id,
        username: editedData.username,
        password: editedData.password,
        email: editedData.email,
        profilePicture: url,
      };

      try {
        const res = await axios.put(
          `https://social-media-app-vp1y.onrender.com/api/user/${user._id}`,
          updateData
        );

        console.log(res);

        // Check if the response status is 200 (OK)
        if (res.status === 200) {
          console.log("Profile has been modified successfully!");

          // Update local storage with the new user data
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch(updateUser(res.data));
        
        }
        window.location.reload();


      } catch (error) {
        console.log(error);
      }

      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(
        `https://social-media-app-vp1y.onrender.com/api/user/${user?._id}`
      );
      console.log(res);
      // Ajoutez ici la logique pour gérer la suppression du compte
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-profile-page">
      {loading && <div className="loader-container"><Loader /></div>}
      {!loading && (
        <div className="edit-profile-modal">
          <button className="modal-close" onClick={closeModal}>
            X
          </button>
          <h2>Edit Profile</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="username"
                value={editedData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={editedData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="submit-button">
                Save Changes
              </button>
              <button onClick={handleDeleteAccount} className="delete-button">
                Delete Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModalEditProfile;
