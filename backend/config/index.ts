const dotEnv = require('dotenv');

if (process.env.NODE_ENV !== 'prod') {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({path: configFile});
} else {
    dotEnv.config()
}

const conf = {
    PORT: process.env.PORT,
    DB: {
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_IP,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
    },
}


module.exports = conf
