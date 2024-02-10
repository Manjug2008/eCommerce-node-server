/**
 * Express router providing a root route
 * @module routers/home
 */

const express = require('express')
const router = express.Router()

/**
 * Root route returns generic Hello E-commerce-task
 * @function
 * @name get/
 * @memberof module:routers/home
 */
router.get('/', (req, res) => {
  res.send('Welcome to E-commerce server')
})

module.exports = router
