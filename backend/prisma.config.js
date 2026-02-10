require('dotenv/config');

console.log('🔍 DATABASE_URL:', process.env.DATABASE_URL);

module.exports = {
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

/*export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
  migrations: {
    seed: 'ts-node prisma/seed.ts',
  },
};*/