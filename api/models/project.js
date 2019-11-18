const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tags: String,
    title: String,
    description: String,
    links: String,
    preview: String
});

module.exports = mongoose.model('project', projectSchema);