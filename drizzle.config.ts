import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: [
    'D:/University/FYP/crypto_trader/src/database/scheemas/chains.ts',
    'D:/University/FYP/crypto_trader/src/database/scheemas/Tokens.ts',
    'D:/University/FYP/crypto_trader/src/database/scheemas/Exchange.ts',
    'D:/University/FYP/crypto_trader/src/database/scheemas/DeFi.ts'
  ],
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
} as Config;
