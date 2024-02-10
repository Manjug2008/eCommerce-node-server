const logger = require('../../utils/logger')

class GetCatogeryProductsController {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async execute (req, res) {


    const { categoryCode } = req.params
    const { locals: { requestId } } = res

 
    const metaLogger = logger.logWithMetaData(requestId, req.originalUrl)

    metaLogger.info('Fetch all products associated with brand')
    const listOfCategoryProducts = await this.productRepository.getCategoryProducts(categoryCode)
    

    return res.status(200).json(listOfCategoryProducts)
  }
}

module.exports = GetCatogeryProductsController
