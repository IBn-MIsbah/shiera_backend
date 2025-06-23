import express from "express";

import auth from "../middleware/authMiddleware.js";
import blogController from "../controllers/blogController.js";
import userControlles from "../controllers/userController.js";

const router = express.Router();

router.post("/new-blog", auth.protect, blogController.createBlog);
router.get("/blogs", blogController.viewBlog);
router.get("/blog/:id", blogController.singleBlog);

router.get("/user", auth.protect, userControlles.gerMyBlogs);
router.put("/update/:id", auth.protect, userControlles.updatePost);
router.delete("/delete/:id", auth.protect, userControlles.deletePost);
export default router;
