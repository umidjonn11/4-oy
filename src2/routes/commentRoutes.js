import express from "express";
import {
  registerComments,
  GetAllComments,
  GetOneComment,
  UpdateComment,
  deleteCommentbyId,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/comments", registerComments);
router.get("/comments", GetAllComments);
router.get("/comments/:id", GetOneComment);
router.put("/comments/:id", UpdateComment);
router.delete("/comments/:id", deleteCommentbyId);

export default router;
