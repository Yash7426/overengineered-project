import express from "express"
import protect from "../middleware/authMiddleware";
import { createBlog, deleteBlog, dislikeBlog, getAllBlogs, getAllBlogsExceptUser, getBlogById, getUserBlog, likeBlog, updateBlog } from "../controller/blogController";

 const router = express.Router();

router.post("/create", protect, createBlog)
router.post("/update", protect, updateBlog)
router.post("/getblogbyId", protect, getBlogById)
router.post("/getuserblog", protect, getUserBlog)
router.post("/delete/:blogId", protect, deleteBlog)
router.post("/likeblog", protect, likeBlog)
router.post("/dislikeblog", protect, dislikeBlog)
router.post("/getblogs", getAllBlogs)
router.post("/getblogsexceptuser", protect,getAllBlogsExceptUser)
export default router;