// postsSlice.js
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

// export const deleteComment = createAsyncThunk(
//   "posts/deleteComment",
//   async ({ postId, commentId }) => {
//     try {
//       const response = await axios.delete(
//         `https://social-media-app-vp1y.onrender.com/api/comments/${commentId}`
//       );

//       console.log("Delete Comment Response:", response.data);

//       return { postId, commentId };
//     } catch (error) {
//       console.error(`Error deleting comment with ID ${commentId}:`, error);
//       throw error;
//     }
//   }
// );


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
      console.log(response.data);
      return response.data;
     
    } catch (error) {
      throw error;
    }
  }
);



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

      .addCase(addComment.fulfilled, (state, action) => {
        // Update the state to include the new comment
        const {postId, commentId } = action.payload;
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          post.comments.push(commentId);
        }
      })

      // Add this case to the reducer
      // .addCase(deleteComment.fulfilled, (state, action) => {
      //   const { postId, commentId } = action.payload;
      //   const post = state.posts.find((post) => post._id === postId);

      //   if (post) {
      //     // Remove the deleted comment from the post's comments array
      //     post.comments = post.comments.filter(
      //       (comment) => comment._id !== commentId
      //     );
      //   }
      // });

      .addCase(deleteComment.fulfilled, (state, action) => {
        const commentId = action.payload;
        // Iterate over posts and remove the comment from the post
        state.posts.forEach((post) => {
          post.comments = post.comments.filter(
            (comment) => comment._id !== commentId
          );
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
      
  },
});

export default postsSlice.reducer;



