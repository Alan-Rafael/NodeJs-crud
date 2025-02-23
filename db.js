import 'dotenv/config'
import postgres from 'postgres';

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST } = process.env;

export const sql = postgres({
    host: PGHOST,
    port: 5432, 
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    ssl: false,  
});

export default sql