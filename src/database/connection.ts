import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const db = drizzle(sql)


// host: process.env.POSTGRES_HOST,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DATABASE,

// import mysql from 'mysql2/promise';
// import * as schema from './schema';

// export const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   multipleStatements: true,
// });

// export const db = drizzle(connection, { schema });