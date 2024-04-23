// src/routes/blogRoutes.ts
import express from "express";
import * as blogController from "../controllers/blogController";

const router = express.Router();

router.get("/", blogController.getAllBlogs);

router.post("/", blogController.createBlog);

router.get("/:id", blogController.getBlogById);

router.post("/:id/comments", blogController.addCommentToBlog);

router.post(
  "/:blogId/comments/:commentId/replies",
  blogController.addReplyToComment
);

export default router;
