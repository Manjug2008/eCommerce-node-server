const logger = require('../../utils/logger')

class GetAllProductsController {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async execute (req, res) {
    const { locals: { requestId } } = res

 
    const metaLogger = logger.logWithMetaData(requestId, req.originalUrl)

    metaLogger.info('Fetch all products')
    const listOfAllProducts = await this.productRepository.getAllProducts()
    

    return res.status(200).json(listOfAllProducts)
  }
}

module.exports = GetAllProductsController
