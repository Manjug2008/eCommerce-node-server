const Joi = require('@hapi/joi')
module.exports = {

  /* get/products/category/:categoryCode/brand/:brandCode */
  getProductAssociatedWithBrand: {
    categoryCode: Joi.string().required(),
    brandCode: Joi.string().required()
  },

  /** get/products/category/:categoryCode */
  getProductAssociatedWithCategoryCode: {
    categoryCode: Joi.string().required(),
    
  },

  /** get/products/:productCode/details */
  getProductDetailsAssociatedWithCode: {
    productCode: Joi.string().required(),
    
  }
}
