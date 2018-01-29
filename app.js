'use strict';

const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('koa-bodyparser');


const config = require('./config');
const sessionStorage = require('./sessionStorage');

app.use(bodyParser());


const dbConnect = async function () {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log(`connected to mongo`);
    } catch (err) {
        console.log("unable to connect to the database: ", err);
    }
};

(async function() {
    await dbConnect();
    app.listen(config.port);
    console.log('listening on port:', config.port);
})();
