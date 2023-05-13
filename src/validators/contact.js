const Joi = require('joi')

const post = Joi.object({
    email: Joi.string().email({tlds: {allow: true}}).required(),
    name: Joi.string().max(100).required(),
    message: Joi.string().max(1000).required(),
    captcha: Joi.string().max(255).required()
})

module.exports = {
    post
}