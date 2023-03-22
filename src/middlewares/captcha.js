const { verifyIdToken } = require("../utils/google")

const isValidGoogleToken = (provider='body', attribute='token')=>{
    return async (req, res, next) => {
        try{
            req.google = await verifyIdToken(req[provider][attribute])
            next()
        }
        catch(e){
            res.status(401).json({error: 'invalid google token'})
        }
    }
}



module.exports = {
    isValidGoogleToken
}