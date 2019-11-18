const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tags: String,
    date: String,
    title: String,
    description: String,
    location: String,
    image: String
});

module.exports = mongoose.model('event', eventSchema);