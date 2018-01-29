'use strict';

const config = require('./config');

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient({host: config.redis.host, port: config.redis.port});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('connect', () => {
    console.log('connected to redis');
});

client.on('error', err => {
    console.log("Error " + err);
});


module.exports = {
    get: async (...args) => client.getAsync(...args),
    set: (...args) => client.set(...args),
    remove: (...args) => client.del(...args)
}
