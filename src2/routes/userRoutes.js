import express from "express";
import {
  registerController,
  loginController,
  GetAllUsers,
  GetOneUser,
  UpdateUser,
  deleteById,

} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerController);
router.get("/users",GetAllUsers)
router.get("/users/:id",GetOneUser)
router.put("/users/:id",UpdateUser)
router.delete("/users/:id",deleteById)
router.post("/login", loginController);

export default router;
