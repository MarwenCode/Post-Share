// Posts.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment,deletePost, addComment,addPost, fetchPosts, likePost } from "../../redux/slices/postsSlice";
import ModalEditComment from "../posts/ModalEditComment";
import { FaHeart } from "react-icons/fa";
import ModalEditPost from "../posts/ModalEditPost";

const OwnPosts = ({isDarkTheme}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user.data);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [editCommentMode, setEditCommentMode] = useState(false);
  const [editModePost, setEditModePost] = useState(false);

 
  const [likedPosts, setLikedPosts] = useState({});

  console.log(user);
  console.log(user?.username);
  console.log(user?._id);

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLike = async (postId) => {
    try {
      // Handle the like logic here (you may need to dispatch an action)
      await dispatch(likePost({ postId: postId, userId: user._id }));
      // Update the likedPosts state after handling the like logic
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [postId]: !prevLikedPosts[postId],
      }));
      dispatch(fetchPosts()); // Optionally fetch posts after like operation
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };
  


  //add new comments

  const handleAddComment = async (postId) => {
    try {
      // Ensure that user is authenticated
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const newCommentData = {
        userId: user._id,
        username: user.username,
        text: newComments[postId],
      };

      // Dispatch the addComment action
      await dispatch(addComment({ postId, comment: newCommentData }));

      // Dispatch the fetchPosts action to refresh the posts data
      await dispatch(fetchPosts());

      console.log(newCommentData);

      setNewComments("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };


  const handleDeletePost = async (postId) => {
    try {
      await dispatch(deletePost({ postId }));

      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      [postId]: !prev[postId],
    }));
  };



  const openEditModeComment = () => {
    setEditCommentMode(true);
  };

  const closeEditModeComment = () => {
    setEditCommentMode(false);
  };



  const handleDeleteComment = async (postId, commentId) => {
    try {
      // Dispatch the deleteComment action
      console.log("Deleting comment:", postId, commentId);
      await dispatch(deleteComment({ commentId }));
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error(`Error deleting comment with ID ${commentId}:`, error);
    }
  };




  if (posts.loading) {
    return <p>Loading...</p>;
  }

  if (posts.error) {
    return <p>Error: {posts.error}</p>;
  }

  if (!Array.isArray(posts.posts) || posts.posts.length === 0) {
    return <p>No posts available.</p>;
  }
  return (
    <div className={`postsContainer ${isDarkTheme ? "dark" : ""}`}>
      {posts.posts.map((post) => (
        <div key={post._id} className="post">
          {post.userId === user?._id && (
            <div className="postWrapper">
              <div className="postTop">
                <img className="postImg" src={post.photo} alt="" />
                <span className="postUsername">{post.username}</span>
                <span className="postDate">
                  {new Date(post.createdAt).toDateString()}
                </span>
              </div>
              <div className="postCenter">
                <span className="postText">{post.desc}</span>
                {post.img && (
                <img
                  className="postImage"
                  src={`http://localhost:5500/images/${post.img}`}
                  alt="Post"
                />
              )}
                    <div className="postActions">
                <button
                  className={`like ${likedPosts[post._id] ? "liked" : ""}`}
                  onClick={() => handleLike(post._id)}>
                  <FaHeart color={likedPosts[post._id] ? "red" : "#ab9f9f"} />
                </button>
                <span>{post.likes.length} Likes</span>

                {editModePost && (
                  <ModalEditPost
                    onClose={closeEditModePost}
                    initialText={post.desc}
                    postId={post._id}
                  />
                )}

                {post.userId === user?._id && (
                  <>
                    <button
                      className="editIcon"
                      onClick={() => setEditModePost(true)}>
                      ✏️ Edit
                    </button>

                    <button
                      className="deleteIcon"
                      onClick={() => handleDeletePost(post._id)}>
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>

                <div className="postComments">
                <div
                  className="commentCount"
                  onClick={() => toggleComments(post._id)}>
                  <span className="commentIcon" >🗨️</span>
                 <span className="nbr"> {post?.comments?.length} </span> <span className="text" >Comments</span>

                </div>

                  <textarea
                    type="text"
                    value={newComments[post._id] || ""}
                    onChange={(e) =>
                      setNewComments({
                        ...newComments,
                        [post._id]: e.target.value,
                      })
                    }
                  />
                  <button
                    className="add"
                    onClick={() => handleAddComment(post._id)}>
                    Add Comment
                  </button>

                  {expandedComments[post._id] && (
                    <>
                      <h3>Comments</h3>
                      <ul>
                        {post.comments?.map((comment) => (
                          <li key={comment._id}>
                            <div className="content">
                              <span className="commentIcon">🗨️</span>
                              {editCommentMode ? (
                                <>
                                  <ModalEditComment
                                    onClose={closeEditModeComment}
                                    postId={post._id}
                                    commentId={comment._id}
                                    initialText={comment.text}
                                  />
                                </>
                              ) : (
                                <>
                                  <strong>{comment.username}</strong>:{" "}
                                  {comment.text}
                                  {new Date(comment.createdAt).toDateString()}
                                </>
                              )}
                            </div>

                            {comment.userId === user._id && (
                              <div className="icons">
                                <button
                                  className="deleteCommentIcon"
                                  onClick={() =>
                                    handleDeleteComment(post._id, comment._id)
                                  }>
                                  🗑️
                                </button>
                                <button
                                  className="editCommentIcon"
                                  onClick={() =>
                                    // handleEditComment(post._id, comment._id)

                                    openEditModeComment()
                                  }>
                                  ✏️
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OwnPosts;
