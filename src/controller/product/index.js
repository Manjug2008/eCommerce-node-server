const GetAllProductsController = require('./getAllProductsController')
const GetBrandProductsController = require('./getBrandProductsController')
const GetCatogeryProductsController = require('./getCatogeryProductsController')
const GetProductDetailsController = require('./getProductDetailsController')

const productRepository = require('../../repositories/product')

const getAllProductsController = new GetAllProductsController(productRepository)
const getBrandProductsController = new GetBrandProductsController(productRepository)
const getCatogeryProductsController = new GetCatogeryProductsController(productRepository)
const getProductDetailsController = new GetProductDetailsController(productRepository)

module.exports = {
    getAllProductsController,
    getBrandProductsController,
    getCatogeryProductsController,
    getProductDetailsController
}
