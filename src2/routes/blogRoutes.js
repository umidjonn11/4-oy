import express from "express";
import {
  registerBlogs,
  GetAllBlogs,
  GetOneBlog,
  UpdateBlog,
  deleteBlogbyId,
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/blogs", registerBlogs);
router.get("/blogs", GetAllBlogs);
router.get("/blogs/:id", GetOneBlog);
router.put("/blogs/:id", UpdateBlog);
router.delete("/blogs/:id", deleteBlogbyId);

export default router;
