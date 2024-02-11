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
 * The route to respond with all products
 * @name get/products
 * @function
 * @memberof module:routers/products
 * @returns {productDetailsList[]} The product detail {@link module:repository/products~productDetailsList}
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
 * The route to respond with products associated with brand code
 * @name get/products/brand/:brandCode
 * @function
 * @memberof module:routers/products
 * @param {String} req.param.brandCode The product brand
 * @returns {productDetailsList[]} The product detail associated with brand {@link module:repository/products~productDetailsList}
 */
router.get('/category/:categoryCode/brand/:brandCode', loggerMiddleware, validationMiddleware(validation.getProductAssociatedWithBrand), asyncMiddleware(async (req, res) => {
  return await productController.getBrandProductsController.execute(req, res)
}))



/**
 * The route to respond with products associated with categoryCode
 * @name get/products/category/:categoryCode
 * @function
 * @memberof module:routers/products
 * @param {String} req.param.brandCode The product brand
 * @param {String} req.param.categoryCode The product categoryCode
 * @returns {productDetailsList[]} The product detail associated with brand and category {@link module:repository/products~productDetailsList}
 */
router.get('/category/:categoryCode', loggerMiddleware, validationMiddleware(validation.getProductAssociatedWithCategoryCode), asyncMiddleware(async (req, res) => {
  return await productController.getCatogeryProductsController.execute(req, res)
}))

/**
 * The route to respond with product details associated with product code
 * @name get/products/:productCode/details
 * @function
 * @memberof module:routers/products
 * @param {String} req.param.productCode The product code
 * @returns {productDetails[]} The product detail associated with brand and category {@link module:repository/products~productDetails}
 */
/**
 * @inner
 * @typedef {Object} productDetails
 * @property {String} productDetails.productBrandCode The product brand code
 * @property {String} productDetails.productBrandName The product brand name
 * @property {String} productDetails.productCategoryCode The product category code
 * @property {String} productDetails.productCategoryName The product categoryname
 * @property {String} productDetails.productCode The product code
 * @property {String} productDetails.productTitle The product title
 * @property {String} productDetails.productDescription The product description
 * @property {String} productDetails.productImageUrl The product image url
 * @property {number} productDetails.productPrice The product price
 * @property {aboutProductList[]} The about product details {@link module:repository/products~aboutProductList}
 */
/**
 * @inner
 * @typedef {Object} aboutProductList
 * @property {String} aboutProductList.aboutProductDescription The about product description
 */
router.get('/:productCode/details', loggerMiddleware, validationMiddleware(validation.getProductDetailsAssociatedWithCode), asyncMiddleware(async (req, res) => {
  return await productController.getProductDetailsController.execute(req, res)
}))

module.exports = router
