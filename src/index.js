const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const express = require('express')

//  Packaged middleware
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const auth = require('./middleware/auth')

//  Custom middleware
const requestIdGenerator = require('./middleware/requestIdGenerator')
const error = require('./middleware/error')
const morganFormatter = require('./middleware/morganFormatter')

//  Util packages
const logger = require('./utils/logger')
const envConfig = require('./utils/envConfig')

const app = express()

// Change morgan date format.
morgan.token('date', () => {
  return new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })
})

// Remove token from request query parameter using morgan URL
morgan.token('url', (req) => {
  if (req.url.includes('&token')) {
    return req.url.substring(0, req.url.indexOf('&token'))
  } else { return req.url }
})

morgan.token('request-id', (res) => {
  return res.locals.requestId
})


app.use(helmet())
app.use(cors())

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({
  extended: true}))
app.use(bodyParser.json())

app.use(requestIdGenerator)
app.use(morgan(morganFormatter, { stream: logger.stream }))


const homeRoute = require('./home')
const products = require('./routes/products')
app.use('/', homeRoute)
app.use('/products', auth.appSecretCheck, products)


app.use(error)

envConfig()


const port = process.env.SERVER_PORT || 8001
app.listen(port, () => console.log(`Listening to port ${port} `))
