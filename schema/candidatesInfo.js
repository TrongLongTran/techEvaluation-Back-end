const mongoose = require('mongoose');

const candidates = new mongoose.Schema({
    id: {type: String, required: true},
    candidate: {type: String, required: true},
    voter_id: {type: String, required: true},
    metadata: {
      resolution_id: {type: Number, required: true},
      title: {type: String, required: true},
      agenda: {type: String, required: true},
      resolution: {type: String, required: true},
      vote_date: {type: String, required: true},
      vote_summary: {type: String, required: true},
      original_candidate: {type: String, required: true}
    },
    timestamp: {type: String, required: true}
})

const Candidate = mongoose.model('candidatesInfo', candidates);

module.exports = Candidate;