import { Router } from "express";
import { login } from "../api/auth/login";
import { register } from "../api/auth/register";

const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
