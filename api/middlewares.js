'use strict';
const sessionStorage = require('../redisClient');
const AppError = require('../AppError');
const {User, Candidate} = require('./models');

const mongoose = require('mongoose');


const checkLogin = async (ctx, next) => {
    let sessionId = ctx.cookies.get('sessionId');
    let userId = await sessionStorage.get(sessionId)

    if (!userId) throw new AppError(401, 'Unauthorized');

    let user = await User.findOne({_id: userId});
    if (!user) throw new AppError(401, 'Unauthorized');

    ctx.state.user = user;
    return next();
};


const checkCandidateExists = async (ctx, next) => {
    let candidateId = ctx.params.candidateId;
    if (!candidateId) throw new AppError(400, 'Candidate id is required');
    if (!mongoose.Types.ObjectId['isValid'](candidateId)) throw new AppError(400, 'Invalid id');

    let candidate = await Candidate.findOne({_id: candidateId});
    if (!candidate) throw new AppError(404, 'Candidate not found');

    ctx.state.candidate = candidate;
    return next();
};

module.exports = {
    checkLogin,
    checkCandidateExists
};
