'use strict';

const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Candidate'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});


module.exports = mongoose.model('Vote', VoteSchema);
'use strict';
