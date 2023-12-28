const BASE_URL = "https://blogsio-p891.onrender.com/api/v1";

export const authEndpoints = {
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  SIGNIN_API: `${BASE_URL}/auth/signin`,
};

export const settingEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateDisplayPicture`,
  UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`,
};

export const blogEndpoints = {
  GET_ALL_BLOGS_API: `${BASE_URL}/blog/getAllBlogs`,
  GET_BLOG_BY_ID: `${BASE_URL}/blog/getBlogById`,
  CREATE_BLOG_API: `${BASE_URL}/blog/createBlog`,
  EDIT_BLOG_API: `${BASE_URL}/blog/editBlog`,
  DELETE_BLOG_API: `${BASE_URL}/blog/deleteBlog`,
};
