const contact = require('../controllers/contact')
const { isValidGoogleToken } = require('../middlewares/captcha')
const schema = require('../validators/contact')
const isValid = require('../middlewares/isValid')

const router = require('express').Router()

router.post('/contact', [isValid(schema.post), isValidGoogleToken()], contact.post)

module.exports = router