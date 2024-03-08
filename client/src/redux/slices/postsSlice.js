import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(
      "http://localhost:5500/api/post"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchOwnPosts = createAsyncThunk("posts/fetchOwnPosts", async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(
      "http://localhost:5500/api/post/myposts/:id"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});


export const fetchUserPosts = createAsyncThunk("posts/fetchUserPosts", async ({ userId }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(
      `http://localhost:5500/api/post/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the async thunk to add a comment
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(
        `http://localhost:5500/api/comments/${postId}`,
        comment
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ commentId }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.delete(
        `http://localhost:5500/api/comments/${commentId}`
      );
      return commentId;
    } catch (error) {
      throw error;
    }
  }
);

export const editComment = createAsyncThunk(
  "posts/editComment",
  async ({ commentId, updatedText }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.put(
        `http://localhost:5500/api/comments/${commentId}`,
        { text: updatedText }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData, thunkAPI) => {
    try {
      const user = thunkAPI.getState().user.data;

      // Ensure that required data is available
      if (!postData.desc || !user._id || !user.username) {
        console.error("Description, userId, and username are required.");
        return;
      }

      // Create a plain object to send as the request body
      const newPostData = {
        desc: postData.desc,
        userId: user._id,
        username: user.username,
      };

      // Send the request to the server
      const response = await axios.post("http://localhost:5500/api/post", newPostData);

      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error adding post:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId }) => {
    try {
      await axios.delete(`http://localhost:5500/api/post/${postId}`);

      return postId;
    } catch (error) {
      console.error("Error deleting post:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editPost = createAsyncThunk("posts/editPost", async ({ postId, updatedText }) => {
  try {
    const response = await axios.put(`http://localhost:5500/api/post/${postId}`, {
      desc: updatedText,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});


export const likePost = createAsyncThunk("posts/likePost", async ({ postId, userId }) => {
  try {
    const response = await axios.put(`http://localhost:5500/api/post/${postId}/like`, { userId });
    return { postId, userId, action: response.data }; // Response data could be "liked" or "disliked"
  } catch (error) {
    throw error;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { loading: false, posts: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload;
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== postId),
        };
      })

      .addCase(editPost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const index = state.posts.findIndex((post) => post._id === updatedPost._id);

        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })

      .addCase(addComment.fulfilled, (state, action) => {
        // Update the state to include the new comment
        const { postId, commentId } = action.payload;
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          post.comments.push(commentId);
        }
      })

      .addCase(fetchOwnPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        const commentId = action.payload;
        // Iterate over posts and remove the comment from the post
        state.posts.forEach((post) => {
          post.comments = post.comments.filter((comment) => comment._id !== commentId);
        });
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        const post = state.posts.find((post) =>
          post.comments.some((comment) => comment._id === updatedComment._id)
        );

        if (post) {
          post.comments = post.comments.map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
          );
        }
      })
       .addCase(likePost.fulfilled, (state, action) => {
        const { postId, userId, action: likeAction } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
  
        if (post) {
          if (likeAction === 'liked') {
            post.likes.push(userId);
          } else if (likeAction === 'disliked') {
            post.likes = post.likes.filter((likeUserId) => likeUserId !== userId);
          }
        }
      });
      
      
  },
});

export default postsSlice.reducer;