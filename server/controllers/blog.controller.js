const Blog = require("../models/blog.model");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogTitle, blogShortDesc, blogCategory, blogContent } = req.body;
    const blogCover = req.files.blogCover;

    if (
      !blogTitle ||
      !blogShortDesc ||
      !blogCategory ||
      !blogCover ||
      !blogContent
    ) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all the fields",
      });
    }

    const result = await uploadImageToCloudinary(blogCover, "blogCovers");
    console.log(result);

    const newBlog = await Blog.create({
      blogTitle,
      blogShortDesc,
      blogCategory,
      blogCover: result.secure_url,
      blogContent,
      author: userId,
    });

    return res.status(200).json({
      success: true,
      data: newBlog,
      msg: "Course Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Failed to create Blog",
      error: error.message,
    });
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const allBlogs = await Blog.find({})
      .sort({ _id: -1 })
      .populate("author")
      .exec();
    return res.status(200).json({
      success: true,
      data: allBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Can't fetch all blogs",
      error: error.message,
    });
  }
});

const getBlogById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("author").exec();
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Can't fetch blog by id",
      error: error.message,
    });
  }
});

const editBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.body;
    const updates = req.body;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found",
      });
    }

    if (req.files) {
      console.log("blog cover update");
      const blogCover = req.files.blogCover;
      const result = await uploadImageToCloudinary(blogCover, "blogCovers");
      blog.blogCover = result.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        blog[key] = updates[key];
      }
    }

    await blog.save();

    const updatedBlog = await Blog.findOne({ _id: blogId })
      .populate("author")
      .exec();

    return res.json({
      success: true,
      msg: "Blog Updated Successfully",
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.user.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found",
      });
    }

    if (blog.author.toString() !== userId) {
      return res.status(404).json({
        success: false,
        msg: "Only author can delete their blogs",
      });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.json({
      success: true,
      msg: "Blog Delete Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = { createBlog, getAllBlogs, getBlogById, editBlog, deleteBlog };
