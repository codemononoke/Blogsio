const router = require("express").Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  editBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const { getAccessToRoute } = require("../middleware/auth");

router.post("/createBlog", getAccessToRoute, createBlog);
router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlogById/:id", getBlogById);
router.post("/editBlog", getAccessToRoute, editBlog);
router.delete("/deleteBlog", getAccessToRoute, deleteBlog);

module.exports = router;
