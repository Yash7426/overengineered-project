import express from "express"
import protect from "../middleware/authMiddleware";
import { addComment, deleteComment, getComments } from "../controller/commentController";

const router = express.Router();

router.post("/add", protect, addComment)
router.post("/getAll", protect, getComments)
router.post("/delete", protect, deleteComment)
export default router;