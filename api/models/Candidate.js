'use strict';


const mongoose = require('mongoose');


const CandidateSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    votes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Vote'}]
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

CandidateSchema.virtual('votesLength').get(function () {
    return this.votes? this.votes.length: null;
});

module.exports = mongoose.model('Candidate', CandidateSchema);
