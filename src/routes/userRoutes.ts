// src/routes/userRoutes.ts
import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authenticateUser, (req: any, res: any) => {
  res.json(req.user);
});

export default router;
