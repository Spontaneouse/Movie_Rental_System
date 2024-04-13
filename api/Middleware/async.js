asyncMiddleware = function(){
    return async function (req, res, next){
        try{
            await handler(req, res);
        }
        catch (ex) {
        next();
        }
    };
}

module.exports.asyncMiddleware = asyncMiddleware;