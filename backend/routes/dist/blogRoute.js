"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authMiddleware_1 = require("../middleware/authMiddleware");
var blogController_1 = require("../controller/blogController");
var router = express_1["default"].Router();
router.post("/create", authMiddleware_1["default"], blogController_1.createBlog);
router.post("/update", authMiddleware_1["default"], blogController_1.updateBlog);
router.post("/getblogbyId", authMiddleware_1["default"], blogController_1.getBlogById);
router.post("/getuserblog", authMiddleware_1["default"], blogController_1.getUserBlog);
router.post("/delete/:blogId", authMiddleware_1["default"], blogController_1.deleteBlog);
router.post("/likeblog", authMiddleware_1["default"], blogController_1.likeBlog);
router.post("/dislikeblog", authMiddleware_1["default"], blogController_1.dislikeBlog);
router.post("/getblogs", blogController_1.getAllBlogs);
router.post("/getblogsexceptuser", authMiddleware_1["default"], blogController_1.getAllBlogsExceptUser);
exports["default"] = router;
