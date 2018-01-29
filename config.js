'use strict';

require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    redisUrl: process.env.REDIS_URL,
    saltFactor: process.env.SALT_FACTOR
};
