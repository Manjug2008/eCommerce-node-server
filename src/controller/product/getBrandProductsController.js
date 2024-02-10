const logger = require('../../utils/logger')

class GetBrandProductsController {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async execute (req, res) {


    const { categoryCode, brandCode } = req.params
    const { locals: { requestId } } = res

 
    const metaLogger = logger.logWithMetaData(requestId, req.originalUrl)

    metaLogger.info('Fetch all products associated with brand')
    const listOfBrandProducts = await this.productRepository.getBrandProducts(categoryCode, brandCode)
    

    return res.status(200).json(listOfBrandProducts)
  }
}

module.exports = GetBrandProductsController
