const _ = require('lodash');
const config = require("config");
const jwt = require('jsonwebtoken');
const express = require('express'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User} = require('../models/users');
const router = express.Router();

router.post('/', async function(req, res){
    console.log('Here............1')
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const  validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

    function validateUser(req){
        const schema = {
            email: Joi.string().min(5).max(50).required().email(),       
            password: Joi.string().min(5).max(50).required(),
        };
    
        return Joi.validate(user, schema);
    }

    module.exports = router; 
    