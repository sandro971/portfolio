
const exceptionMiddleware = function(req, res, next){
    try{
        next()
    }
    catch(error){
        res.status(401).json({error})
    }
}

module.exports = {
    exceptionMiddleware
}