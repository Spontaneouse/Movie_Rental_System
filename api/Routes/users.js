const auth = require('../Middleware/auth');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require("config");
const express = require('express'); 
const { User, validateUser } = require('../models/users');
const router = express.Router();
router.get('/me', async function(req, res){
    const user = await User.findById(req.use._id).select('-password');
    res.send(user);
});

router.post('/', async function(req, res){
    console.log('Here............1')
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ["name", "password", "email", ]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.harsh(user.password, salt);
    await user.save();

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    });
 
    module.exports = router;