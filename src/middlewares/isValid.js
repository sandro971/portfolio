

const isValid = (schema, provider)=>{
    return function(req, res, next){
        if(!schema) return next()
        
        if(!provider){
            switch(req.method.toUpperCase()){
                case 'POST':
                case 'PUT':
                    provider = 'body'
                    break

                default:
                case 'GET':
                case 'DELETE':
                    provider = 'query'
                    break
            }   
        }
        
        const {error, value} = schema.validate( req[provider] )
        
        if(error) return res.status(401).json({error})

        req[provider] = value
        next()
    }
}

module.exports = isValid