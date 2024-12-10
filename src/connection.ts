import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg
 
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432
});

const queryETdb = async (query: string, values: any[]) => {
    // const client = await pool.connect();
    try {
      console.log('queryETdb', query, values);
      const res = await pool.query(query, values);
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      // client.release();
    }
  };

export { pool, queryETdb };
