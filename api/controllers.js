'use strict';

const uuid = require('uuid/v4');

const {User, Candidate, Vote} = require('./models');
const AppError = require('../AppError');
const sessionStorage = require('../redisClient');


const register = async (ctx) => {
    let {username, password} = ctx.request.body;
    let checkUser = await User.findOne({username});

    if (checkUser) throw new AppError(409, 'Username already exists');

    let user = new User({username, password});
    let result = await user.save();
    ctx.body = {
        success: true
    };
};


const login = async (ctx) => {
    let {username, password} = ctx.request.body;
    let user = await User.findOne({username});
    if (!user) throw new AppError(404, 'User not found');

    let match = user.comparePassword(password);
    if (!match) throw new AppError(401, 'Password incorrect');

    let sessionId = uuid();
    ctx.cookies.set('sessionId', sessionId);
    sessionStorage.set(sessionId, user._id.toString());
    ctx.body = {
        success: true
    };
};

const logout = async (ctx) => {
    let sessionId = ctx.cookies.get('sessionId');
    sessionStorage.remove(sessionId);
    ctx.cookies.set('sessionId', null);
    ctx.body = {
        success: true
    };
}


const vote = async (ctx) => {
    let {user, candidate} = ctx.state;
    let {comment} = ctx.request.body;

    let vote = new Vote({
        comment,
        user: user._id,
        candidate: candidate._id
    });
    let result = await vote.save();

    candidate.votes.push(result._id);
    await candidate.save();

    ctx.body = {
        success: true
    };
};


const getCandidates = async (ctx) => {
    ctx.body = await Candidate.find();
};


const getVotes = async (ctx) => {
    ctx.body = await Vote
        .find()
        .populate('user', 'username')
        .populate('candidate', 'description');
};


const getTopCandidates = async (ctx) => {
   let query =  Candidate.aggregate([{
                $project : { 
                    votesLength: {$size: { "$ifNull": [ "$votes", [] ] } },
                    description: 1
                }
            }, {   
                $sort: {"votesLength":-1} 
            }]); 

    let {limit} = ctx.request.query;
    if (limit) query = query.limit(parseInt(limit));

    ctx.body = await query;
}


module.exports = {
    register,
    login,
    logout,
    vote,
    getCandidates,
    getVotes,
    getTopCandidates
}
