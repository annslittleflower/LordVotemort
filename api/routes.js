'use strict';

const Router = require('koa-router');

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const router = new Router({
    prefix: '/api'
});

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.post('/logout', controllers.logout);
router.post('/vote/:candidateId', middlewares.checkLogin, middlewares.checkCandidateExists, controllers.vote);
router.get('/candidates', controllers.getCandidates);
router.get('/candidates/top', controllers.getTopCandidates);
router.get('/votes', controllers.getVotes);


module.exports = router;
