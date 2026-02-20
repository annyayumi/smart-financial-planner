import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Rota protegida acessada com sucesso" });
});

export default router;
