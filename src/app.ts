import express from "express";
import "dotenv/config";
import { json } from "body-parser";
import { errorHandler } from "./utils/errorHanlder";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import { notFoundHandler } from "./middlewares/notfoundHandler";
import { connectDB } from "./config/mongoose";
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
