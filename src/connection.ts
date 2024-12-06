import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg
 
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
});

const queryETdb = async (query: string, values: any[]) => {
    const client = await pool.connect();
    try {
      const res = await client.query(query, values);
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  };

export { pool, queryETdb };
