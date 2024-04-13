const express = require('express'); 
const mongoose = require('mongoose'); 
const router = express.Router();
const { Rental, validateRental} = require('../models/rental');
const { customer, Customer } = require('../models/customer');
const { Movie } = require('../models/movie');

router.get('/', async function(req, res){
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async function(req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (error) return res.status(400).send('Invalid Customer..');

    if (Movie.numberInStock === 0) return res.status(400).send(' Movie not found');
     
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
            },
});
rental = await rental.save(); 

movie.numberInStock--;
movie.save();

res.send(rental);
});