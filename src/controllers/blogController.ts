// src/controllers/blogController.ts
import { Request, Response } from "express";
import * as blogService from "../services/blogService";

export const getAllBlogs = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const { blogs, total } = await blogService.getAllBlogs(page, limit);
    res.json({ blogs, total, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const newBlog = await blogService.createBlog(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const blogId = req.params.id;
  try {
    await blogService.incrementViewCount(blogId); // Increment view count on each request
    const blog = await blogService.getBlogById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getBlogBySlug = async (req: Request, res: Response) => {
  const blogSlug = req.params.slug;
  try {
    await blogService.incrementViewCount(blogSlug); // Increment view count on each request
    const blog = await blogService.getBlogById(blogSlug);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addCommentToBlog = async (req: Request, res: Response) => {
  const blogId = req.params.id;
  const comment = req.body;
  try {
    const updatedBlog = await blogService.addCommentToBlog(blogId, comment);
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addReplyToComment = async (req: Request, res: Response) => {
  const { blogId, commentId } = req.params;
  const reply = req.body;
  try {
    const updatedBlog = await blogService.addReplyToComment(
      blogId,
      commentId,
      reply
    );
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
