const logger = require('../../utils/logger')

class GetProductDetailsController {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async execute (req, res) {


    const { productCode } = req.params
    const { locals: { requestId } } = res

 
    const metaLogger = logger.logWithMetaData(requestId, req.originalUrl)

    metaLogger.info('Checking if the product code is valid')
    const isProductValid = await this.productRepository.validateProductCode(productCode)
    if (isProductValid === false) {
      metaLogger.error('This product code is not valid')
      return res.status(400).json({ message: 'This product code is not valid' })
    }


    metaLogger.info('Fetch product details associated with product code')
    const productDetails = await this.productRepository.getProductDetails(productCode)

    metaLogger.info('Fetch about product details associated with product code')
    const aboutProductList = await this.productRepository.getAboutProduct(productCode)

    const response = productDetails[0]
    response.aboutProduct = aboutProductList
    

    return res.status(200).json(response)
  }
}

module.exports = GetProductDetailsController
