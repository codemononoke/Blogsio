import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: null,
  blogs: [],
  loading: false,
  editBlog: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEditBlog: (state, action) => {
      state.editBlog = action.payload;
    },
    resetBlogState: (state) => {
      state.blog = null;
      state.editBlog = false;
    },
  },
});

export const { setBlog, setBlogs, setEditBlog, resetBlogState, setLoading } =
  blogSlice.actions;
export default blogSlice.reducer;
