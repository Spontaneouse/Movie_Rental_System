const express = require('express');
const { Movie, validateMovie } = require('../models/movie');
const router = express.Router();
const {Genre} = require('../models/genre');
const { valid } = require('joi');

router.get('/', async function(req, res){
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async function(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (error) return res.status(400).send('Invalid genre..');


    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);

});

module.exports = router;