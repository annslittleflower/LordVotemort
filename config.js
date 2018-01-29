'use strict';

require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    saltFactor: process.env.SALT_FACTOR
};
