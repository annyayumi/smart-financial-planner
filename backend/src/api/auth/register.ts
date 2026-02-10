import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/hash";

export async function register(req: Request, res: Response) {
    console.log("BODY RECEBIDO:", req.body);
  const { email, password, confirmPassword, name } = req.body;

  if (!email || !password || !confirmPassword || !name) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Senhas não conferem" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Senha muito curta" });
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.status(409).json({ error: "Email já cadastrado" });
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      name,
    },
  });

  return res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
}
