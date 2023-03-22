const {sendMail} = require('../utils/mailer')

const post = function(req, res){
    sendMail(req.body)
    res.json({})
}



module.exports = {
    post
}