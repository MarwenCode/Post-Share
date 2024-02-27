// Posts.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnPosts, deleteComment,deletePost, addComment,addPost, fetchPosts } from "../../redux/slices/postsSlice";
import ModalEditComment from "../posts/ModalEditComment";

const OwnPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user.data);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [editCommentMode, setEditCommentMode] = useState(false);

 

  console.log(user);
  console.log(user.username);
  console.log(user._id);

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLike = (postId) => {
    // Handle the like logic here (you may need to dispatch an action)
    console.log(`Liked post with ID: ${postId}`);
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
    <div className="postsContainer">
      {posts.posts.map((post) => (
        <div key={post._id} className="post">
          {post.userId === user._id && (
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
                  <img className="postImage" src={post.img} alt="Post" />
                )}
                <div className="postActions">
                  <button className="like" onClick={() => handleLike(post._id)}>
                    &#x2661; Like
                  </button>
                  <span>{post.likes.length} Likes</span>

                  <button className="editIcon">✏️ Edit</button>

                  <button
                      className="deleteIcon"
                      onClick={() => handleDeletePost(post._id)}>
                      🗑️ Delete
                    </button>
                </div>

                <div className="postComments">
                  <div
                    className="commentCount"
                    onClick={() => toggleComments(post._id)}>
                    <span className="commentIcon">🗨️</span>
                    {post.comments?.length} Comments
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
                        {post.comments.map((comment) => (
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
