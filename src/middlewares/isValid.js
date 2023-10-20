

const isValid = (schema, provider="body")=>{
    return function(req, res, next){
        const {error, value} = schema.validate( req[provider], {
            abortEarly: false
        } )
        
        if(error) return res.status(401).json({error})

        req[provider] = value
        next()
    }
}

module.exports = isValid