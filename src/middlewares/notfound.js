
const notfoundMiddleware = function(req, res, next){
    res.status(404).send('404 not found')
}

module.exports = {
    notfoundMiddleware
}