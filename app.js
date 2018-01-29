'use strict';

const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');


const config = require('./config');
const sessionStorage = require('./sessionStorage');
const routes = require('./api/routes');
const catchError = require('./catchError');

mongoose.Promise = require('bluebird');
const app = new Koa();

app.use(bodyParser());
app.use(catchError);
app.use(routes.routes());
app.use(routes.allowedMethods());

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
