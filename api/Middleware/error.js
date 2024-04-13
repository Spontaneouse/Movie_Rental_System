const error = function(err, req, res, next){
    //log the exception
    res.status(500).send('Something failled');
}

module.exports.error = error;

// module.exports = function(err, req, res, next){
//     res.status(500).send('Something went wrong');
// }