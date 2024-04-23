// src/models/Blog.ts
import { Schema, model, Document } from "mongoose";

export interface IComment extends Document {
  user: object;
  content: string;
  replies: IComment[];
}

export interface IBlog extends Document {
  title: string;
  content: string;
  slug: string;
  author: object;
  categories: string;
  comments: IComment[];
  viewCount: number;
}

const CommentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    replies: [this],
  },
  { timestamps: true }
);

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    comments: [CommentSchema],
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog = model<IBlog>("Blog", BlogSchema);

export default Blog;
