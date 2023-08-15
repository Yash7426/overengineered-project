import express from "express"
import protect from "../middleware/authMiddleware";
import { createBlog, dislikeBlog, likeBlog, updateBlog } from "../controller/blogController";

 const router = express.Router();

router.post("/create", protect, createBlog)
router.post("/update", protect, updateBlog)
router.post("/likeblog", protect, likeBlog)
router.post("/dislikeblog", protect, dislikeBlog)
export default router;