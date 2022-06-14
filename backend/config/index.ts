import * as dotEnv from 'dotenv';

if (process.env.NODE_ENV !== 'prod') {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({path: configFile});
} else {
    dotEnv.config()
}

export const conf = {
    PORT: process.env.PORT,
    DB: {
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_IP,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
    },
    SALT: process.env.BCRYPT_SALT,
    JWT: {
        SECRET: process.env.JWT_SECRET,
        ISSUER: process.env.JWT_ISSUER,
        ACCESS_TOKEN_EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE,
        REFRESH_TOKEN_EXPIRE: process.env.JWT_REFRESH_TOKEN_EXPIRE
    }
}
