const GetAllProductsController = require('./getAllProductsController')
const GetBrandProductsController = require('./getBrandProductsController')
const GetCatogeryProductsController = require('./getCatogeryProductsController')

const productRepository = require('../../repositories/product')

const getAllProductsController = new GetAllProductsController(productRepository)
const getBrandProductsController = new GetBrandProductsController(productRepository)
const getCatogeryProductsController = new GetCatogeryProductsController(productRepository)

module.exports = {
    getAllProductsController,
    getBrandProductsController,
    getCatogeryProductsController
}
