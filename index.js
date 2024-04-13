require('winston-mongodb');
const asyncMiddleware = require('./api/Middleware/async');
const error = require('./api/Middleware/error');
const express = require('express');
const mongoose = require('mongoose'); 
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const morgan = require('morgan');
const helmet = require('helmet'); 
const customers = require('./api/Routes/customers');
const genres = require('./api/Routes/genres');
const users = require('./api/Routes/users');
const auth = require('./api/Routes/auth');
const winston = require("winston");
// require('winston-mongodb');
// const movies = require('./api/Routes/movie');
const app = express();

winston.add(winston.transports.File, {filename: 'logfile.log'});
// winston.add(winston.transports.MongoDB,  { db: 'mongodb://localhost/vidly'});



if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
(async function() {
    try {
      await mongoose.connect('mongodb://localhost/Vidly', { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to Mongo Database');
    } catch (error) {
      console.error('Could not connect to Mongo Database');
    }
  })();
// mongoose.connect('mongodb://localhost/Vidly', 
//     { useNewUrlParser: true, useUnifiedTopology: true })
// .then(function(){ 
//     console.log('Connected to Mongo Database');
// })
// .catch(error => {
//     console.error('Could not connect to Mongo Database');
// });

app.use(express.json());
app.use('api/genres', genres);
app.use('api/customers', customers);
app.use('api/users', users);
app.use('/api/auth', auth);
// app.use('api/movie', movie);
// app.use(error);
// app.use(async);

app.use (function(err, req, res, next){
    res.status(500).send('Something failled');
});


const port = process.env.PORT || 4000;
app.listen(port, function(){ 
   console.log(`Listening on port  ${port} ....`)
});

