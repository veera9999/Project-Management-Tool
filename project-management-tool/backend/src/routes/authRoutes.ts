import express, { response } from "express";
import { register, login, logout } from "../controllers/authController";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome to the Project Management Auth Routes:");
});
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
export default router;
