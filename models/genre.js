const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        maxlength: 15,
        minlength: 5,
        required: true
    }
}));

function validateGenre(genre) {
    const schema = {name: Joi.string().min(5).max(15).required()}
    return Joi.validate(genre, schema);
}

exports.Genre=Genre;
exports.validate=validateGenre;