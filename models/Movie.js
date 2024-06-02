const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: String, required: true },
    imdbID: { type: String, required: true },
    poster: { type: String },
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
