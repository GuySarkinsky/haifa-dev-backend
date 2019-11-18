const mongoose = require('mongoose');

const projectRequestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: String,
    submittedBy: String,
    content: String
});

module.exports = mongoose.model('projectRequest', projectRequestSchema);