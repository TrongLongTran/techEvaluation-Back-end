const mongoose = require('mongoose');

const summaries = new mongoose.Schema({
    _id: {type: Object, required: false},
    total_resolutions: {type: Number, required: true},
    total_votes: {type: Number, required: true},
    date_range: {
      earliest: {type: String, required: true},
      latest: {type: String, required: true},
    },
    vote_distribution: {
      Yes: {type: Number, required: true},
      No: {type: Number, required: true},
      Abstain: {type: Number, required: true}
    },
    unique_countries: {type: Number, required: true}
})

const Sumarizing = mongoose.model('sumVotes', summaries, 'summaryvotes');

module.exports = Sumarizing;