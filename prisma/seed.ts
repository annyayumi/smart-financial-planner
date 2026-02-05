import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // 1️⃣ Usuário do sistema (seed)
  const systemUser = await prisma.user.upsert({
    where: { email: "system@seed.local" },
    update: {},
    create: {
      email: "system@seed.local",
      passwordHash: "seed",
      name: "System Seed",
    },
  });

  // 2️⃣ Categorias padrão
  const categories = [
    { name: "Alimentação", icon: "🍽️", color: "#FF9800" },
    { name: "Transporte", icon: "🚗", color: "#2196F3" },
    { name: "Moradia", icon: "🏠", color: "#4CAF50" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        userId_name: {
          userId: systemUser.id,
          name: category.name,
        },
      },
      update: {},
      create: {
        ...category,
        userId: systemUser.id,
      },
    });
  }

  console.log("Seed executado com sucesso 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
