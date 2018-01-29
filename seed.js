'use strict';
const uuid = require('uuid/v4');
const {Candidate} = require('./api/models');
const _ = require('lodash');

const candidates = _.map(new Array(200), (c) => {
    return {
        description: `Candidate #${uuid()}`
    };
});

const fill = async () => {
    let check = await Candidate.findOne();
    if (check) return;
    return await Candidate.insertMany(candidates);
};


module.exports = {
    fill
};
