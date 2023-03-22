require('dotenv').config()

const express = require('express')
const { notfoundMiddleware } = require('./src/middlewares/notfound')
const { exceptionMiddleware } = require('./src/middlewares/exception')
const app = express()

app.use(express.static('public'))
app.use(exceptionMiddleware)
app.use(require('./src/routes/index'))
app.use('*', notfoundMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})