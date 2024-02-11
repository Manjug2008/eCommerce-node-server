const logger = require('../../utils/logger')

class GetBrandProductsController {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async execute (req, res) {


    const { categoryCode, brandCode } = req.params
    const { locals: { requestId } } = res

 
    const metaLogger = logger.logWithMetaData(requestId, req.originalUrl)


    metaLogger.info('Checking if the category code is valid')
    const isCategoryValid = await this.productRepository.validateCategoryCode(categoryCode)
    if (isCategoryValid === false) {
      metaLogger.error('This category code is not valid')
      return res.status(400).json({ message: 'This category code is not valid' })
    }

    metaLogger.info('Checking if the brand code is valid')
    const isBrandValid = await this.productRepository.validateBrandCode(brandCode)
    if (isBrandValid === false) {
      metaLogger.error('This brand code is not valid')
      return res.status(400).json({ message: 'This brand code is not valid' })
    }

    metaLogger.info('Fetch all products associated with brand')
    const listOfBrandProducts = await this.productRepository.getBrandProducts(categoryCode, brandCode)
    

    return res.status(200).json(listOfBrandProducts)
  }
}

module.exports = GetBrandProductsController
