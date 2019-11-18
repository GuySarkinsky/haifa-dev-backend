const mongoose = require('mongoose');

const devoloperProfileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    bio: String,
    email: String,
    socials: String
});

module.exports = mongoose.model('devoloperProfile', devoloperProfileSchema);