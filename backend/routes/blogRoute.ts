import express from "express"
import protect from "../middleware/authMiddleware";
import { createBlog, deleteBlog, dislikeBlog, getAllBlogs, getBlogById, getUserBlog, likeBlog, updateBlog } from "../controller/blogController";

 const router = express.Router();

router.post("/create", protect, createBlog)
router.post("/update", protect, updateBlog)
router.post("/getblogbyId", protect, getBlogById)
router.post("/getuserblog", protect, getUserBlog)
router.post("/delete/:blogId", protect, deleteBlog)
router.post("/likeblog", protect, likeBlog)
router.post("/dislikeblog", protect, dislikeBlog)
router.post("/getblogs", protect, getAllBlogs)
export default router;