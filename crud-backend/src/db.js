import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  console.log("Conexión a MySQL establecida correctamente");
} catch (error) {
  console.error("Error al conectar con MySQL:", error);
  process.exit(1);
}

export default pool;
