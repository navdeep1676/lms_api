import Blog, { IBlog, IComment } from "../models/blog";

export const getAllBlogs = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const blogs = await Blog.find().skip(skip).limit(limit).exec();
  const total = await Blog.countDocuments();
  return { blogs, total };
};

export const createBlog = async (blogData: IBlog) => {
  return Blog.create(blogData);
};

export const getBlogById = async (blogId: string) => {
  return Blog.findById(blogId);
};
export const getBlogBySlug = async (blogSlug: string) => {
  return Blog.findById(blogSlug);
};

export const updateBlogById = async (
  blogId: string,
  blogData: Partial<IBlog>
) => {
  return Blog.findByIdAndUpdate(blogId, blogData, { new: true });
};

export const deleteBlogById = async (blogId: string) => {
  return Blog.findByIdAndDelete(blogId);
};

export const addCommentToBlog = async (blogId: string, comment: IComment) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new Error("Blog not found");
  }
  blog.comments.push(comment);
  return blog.save();
};

export const addReplyToComment = async (
  blogId: string,
  commentId: string,
  reply: IComment
) => {
  const blog: any = await Blog.findById(blogId);
  if (!blog) {
    throw new Error("Blog not found");
  }
  const comment = blog.comments.id(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  comment.replies.push(reply);
  return blog.save();
};

export const incrementViewCount = async (blogId: string) => {
  return Blog.findByIdAndUpdate(
    blogId,
    { $inc: { viewCount: 1 } },
    { new: true }
  );
};
