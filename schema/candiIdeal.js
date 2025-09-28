const mongoose = require('mongoose');

const ideal = new mongoose.Schema({
    "id": {type: String, required: true},
    "Title": {type: String, required: true},
    "Agenda": {type: String, required: true},
    "Resolution": {type: String, required: true},
    "Meeting Record": {type: String, required: true},
    "Draft resolution": {type: String, required: true},
    "Note": {type: String, required: true},
    "Vote summary": {type: String, required: true},
    "Vote date": {type: String, required: true},
    "Vote": {type: Object, required: false},
    "Collections": {type: String, required: true},
    "Committee report": {type: String, required: false},
})

const CanIdeal = mongoose.model('canIdeal', ideal, 'allCandidates');

module.exports = CanIdeal;