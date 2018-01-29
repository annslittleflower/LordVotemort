'use strict';

const Router = require('koa-router');

const User = require('./models/User');

const router = new Router({
    prefix: '/api'
});

router.post('/register');


module.exports = router;
