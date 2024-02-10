/**
 * @module routers/products
 */

const express = require('express')
const router = express.Router({ mergeParams: true })

const asyncMiddleware = require('../../middleware/async.js')
const validationMiddleware = require('../../middleware/validationMiddleware.js')
const validation = require('../../validation/product/validate.product.js')
const productController = require('../../controller/product')
const loggerMiddleware = require('../../middleware/loggerMiddleware.js')

/**
 * @name get/products
 * @function
 * @memberof module:routers/products
 * @returns {productDetailsList[]} The product detail {@link module:repository/product~productDetailsList}
 */
/**
 * @inner
 * @typedef {Object} productDetailsList
 * @property {String} productDetailsList.productBrandCode The product brand code
 * @property {String} productDetailsList.productBrandName The product brand name
 * @property {String} productDetailsList.productCategoryCode The product category code
 * @property {String} productDetailsList.productCategoryName The product categoryname
 * @property {String} productDetailsList.productCode The product code
 * @property {String} productDetailsList.productTitle The product title
 * @property {String} productDetailsList.productDescription The product description
 * @property {String} productDetailsList.productImageUrl The product image url
 * @property {number} productDetailsList.productPrice The product price
 */
router.get('/', loggerMiddleware, asyncMiddleware(async (req, res) => {
  return await productController.getAllProductsController.execute(req, res)
}))

/**
 * @name get/products/brand/:brandCode
 * @function
 * @memberof module:routers/products
 * @param {String} req.param.brandCode The product brand
 * @returns {productDetailsList[]} The product detail associated with brand {@link module:repository/product~productDetailsList}
 */
router.get('/category/:categoryCode/brand/:brandCode', loggerMiddleware, validationMiddleware(validation.getProductAssociatedWithBrand), asyncMiddleware(async (req, res) => {
  return await productController.getBrandProductsController.execute(req, res)
}))



/**
 * @name get/products/category/:categoryCode
 * @function
 * @memberof module:routers/products
 * @param {String} req.param.brandCode The product brand
 * @param {String} req.param.categoryCode The product categoryCode
 * @returns {productDetailsList[]} The product detail associated with brand and category {@link module:repository/product~productDetailsList}
 */
router.get('/category/:categoryCode', loggerMiddleware, validationMiddleware(validation.getProductAssociatedWithCategoryCode), asyncMiddleware(async (req, res) => {
  return await productController.getCatogeryProductsController.execute(req, res)
}))

module.exports = router
