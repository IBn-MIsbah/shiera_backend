import express from "express";
import userControlles from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth.protect, userControlles.myProfile);
router.get("/:id", userControlles.getUser);

export default router;
