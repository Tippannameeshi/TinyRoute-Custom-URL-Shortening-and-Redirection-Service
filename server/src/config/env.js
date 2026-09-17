import dotenv from "dotenv";

dotenv.config();

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",

    PORT: Number(process.env.PORT) || 5000,

    CLIENT_URL: process.env.CLIENT_URL,

    DB_HOST: process.env.DB_HOST,

    DB_PORT: Number(process.env.DB_PORT),

    DB_NAME: process.env.DB_NAME,

    DB_USER: process.env.DB_USER,

    DB_PASSWORD: process.env.DB_PASSWORD,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES,

    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES
};

const required = [
    "CLIENT_URL",
    "DB_HOST",
    "DB_PORT",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET"
];

required.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
});