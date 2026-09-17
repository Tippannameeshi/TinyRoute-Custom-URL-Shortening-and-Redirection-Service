import mysql from "mysql2/promise";

import { env } from "./env.js";

import logger from "./logger.js";

const pool = mysql.createPool({

    host: env.DB_HOST,

    port: env.DB_PORT,

    user: env.DB_USER,

    password: env.DB_PASSWORD,

    database: env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0,

    enableKeepAlive: true
});

export const connectDatabase = async () => {

    try {

        const connection = await pool.getConnection();

        logger.info("MySQL Connected Successfully");

        connection.release();

    } catch (error) {

        logger.error(error);

        process.exit(1);

    }

};

export default pool;