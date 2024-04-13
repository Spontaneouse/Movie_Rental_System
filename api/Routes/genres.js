const admin = require('../Middleware/admin');
const auth = require('../Middleware/auth');
const { Genre, validateGenre } = require('../models/genres');
const express = require('express'); 
const mongoose = require('mongoose'); 
const router = express.Router();


router.get('/', asyncMiddleware(async function(req, res){
    const genres = await genres.find().sort('name');
    res.send(genres);
        res.status(500).send('Something failed.');
}));

router.post('/', async function(req, res){
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async function(req, res){
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate( req.params.id, { name: req.body.name },{
        new: true
    });
    if(!genre) return res.status(404).send(error.details[0].message);

    res.send(genre);
});

router.delete('/:id', async function(req, res){
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) return res.status(404).send('The genre with the given ID cannot be found');
    
    res.send(genre);
});


router.get('/:id', async function(req, res){
   const genre = await Genre.findById(req.params.id);
    if (!genres) return res.status(404).send('The genre with the given ID cannot be found');
    res.send(genre);
});

 module.exports = router;
