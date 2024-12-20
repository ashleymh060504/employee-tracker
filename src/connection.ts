import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg
 
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
});

async function connectToDb(): Promise<void> {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};


export { pool, connectToDb };
