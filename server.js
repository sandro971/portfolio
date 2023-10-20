require('dotenv').config()

const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express()


const { notfoundMiddleware } = require('./src/middlewares/notfound')
const { exceptionMiddleware } = require('./src/middlewares/exception')

 
app.use(cors())
app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(exceptionMiddleware)
app.use(require('./src/routes/index'))
app.use('*', notfoundMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})