import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { comparePassword } from "../../lib/hash";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  const passwordMatch = await comparePassword(
    password,
    user.passwordHash
  );

  if (!passwordMatch) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  return res.status(200).json({
    message: "Login realizado com sucesso",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
