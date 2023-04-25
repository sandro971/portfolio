const contact = require('../controllers/contact')
const { isValidGoogleToken } = require('../middlewares/captcha')

const router = require('express').Router()

router.post('/contact', contact.post)// isValidGoogleToken(), contact.post)

module.exports = router