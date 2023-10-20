const { verifyIdToken } = require("../utils/google")

const isValidGoogleToken = (provider='body', attribute='token')=>{
    return async (req, res, next) => {
        verifyIdToken(req[provider][attribute], function(error){
            if(!error) next()
            else{
                console.debug(error)
                res.status(401).json({error})
            }
        })
    }
}





module.exports = {
    isValidGoogleToken
}