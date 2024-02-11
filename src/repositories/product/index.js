/**
 * @module repository/product
 */

const db = require('../../model/db')

module.exports = {
  /**
   * @name getAllProducts
   * @function
   * @instance
   * @memberof module:repository/product
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
  getAllProducts: async function () {
    const query = `select brand.product_brand_code as productBrandCode,
    brand.product_brand_name as productBrandName, category.product_category_code as productCategoryCode,
    category.product_category_name as productCategoryName, product.product_code as productCode,
    product.product_title as productTitle, product.product_description as productDescription,
    product.product_image_url as productImageUrl, product.product_price as productPrice
    from product_category as category
    inner join product_brand as brand on brand.product_category_unique_fk = category.product_category_unique_id
    inner join product on product.product_brand_unique_fk = brand.product_brand_unique_id;`
     const result = await db.mysqlHelpers.runQuery(query)
     return result
  },

  /**
   * @name getBrandProducts
   * @function
   * @instance
   * @memberof module:repository/product
   * @param {String} brandCode The brand code
   * @param {String} category The category code
   * @returns {productDetailsList[]} The product detail {@link module:repository/product~productDetailsList}
   */
  getBrandProducts: async function (categoryCode, brandCode) {
    const params = [categoryCode, brandCode]
    const query = `select brand.product_brand_code as productBrandCode,
    brand.product_brand_name as productBrandName, category.product_category_code as productCategoryCode,
    category.product_category_name as productCategoryName, product.product_code as productCode,
    product.product_title as productTitle, product.product_description as productDescription,
    product.product_image_url as productImageUrl, product.product_price as productPrice
    from product_category as category
    inner join product_brand as brand on brand.product_category_unique_fk = category.product_category_unique_id
    inner join product on product.product_brand_unique_fk = brand.product_brand_unique_id
    where category.product_category_code = ? and brand.product_brand_code = ?;`
  
    const result = await db.mysqlHelpers.runQueryWithParameters(query, ...params)
     return result
  },



  /**
   * @name getCategoryProducts
   * @function
   * @instance
   * @memberof module:repository/product
   * @param {String} brandCode The brand code
   * @returns {productDetailsList[]} The product detail {@link module:repository/product~productDetailsList}
   */
  getCategoryProducts: async function (categoryCode) {
    const query = `select brand.product_brand_code as productBrandCode,
    brand.product_brand_name as productBrandName, category.product_category_code as productCategoryCode,
    category.product_category_name as productCategoryName, product.product_code as productCode,
    product.product_title as productTitle, product.product_description as productDescription,
    product.product_image_url as productImageUrl, product.product_price as productPrice
    from product_category as category
    inner join product_brand as brand on brand.product_category_unique_fk = category.product_category_unique_id
    inner join product on product.product_brand_unique_fk = brand.product_brand_unique_id
    where category.product_category_code = ? ;`
     const result = await db.mysqlHelpers.runQueryWithParameters(query, categoryCode)
     return result
  },



  /**
   * @name validateProductCode
   * @function
   * @instance
   * @memberof module:repository/product
   * @param {String} productCode The brand code
   * @returns {boolean} The boolean status of validation
   */
  validateProductCode: async function (productCode) {
    const query = `SELECT EXISTS (SELECT 1 FROM product WHERE product_code = ?) as isExist;`

    const [{ isExist }] = await db.mysqlHelpers.runQueryWithParameters(query, productCode)
    return !!(isExist)
  },

  /**
   * @name getProductDetails
   * @function
   * @instance
   * @memberof module:repository/product
   * @param {String} productCode The product code
   * @returns {productDetailsList[]} The product detail {@link module:repository/product~productDetailsList}
   */
  getProductDetails: async function (productCode) {
    const query = `select brand.product_brand_code as productBrandCode,
    brand.product_brand_name as productBrandName, category.product_category_code as productCategoryCode,
    category.product_category_name as productCategoryName, product.product_code as productCode,
    product.product_title as productTitle, product.product_description as productDescription,
    product.product_image_url as productImageUrl, product.product_price as productPrice
    from product_category as category
    inner join product_brand as brand on brand.product_category_unique_fk = category.product_category_unique_id
    inner join product on product.product_brand_unique_fk = brand.product_brand_unique_id
    where product.product_code = ? ;`
     const result = await db.mysqlHelpers.runQueryWithParameters(query, productCode)
     return result
  },

  /**
   * @name getAboutProduct
   * @function
   * @instance
   * @memberof module:repository/product
   * @param {String} productCode The product code
   * @returns {aboutProductList[]} The about product details {@link module:repository/product~aboutProductList}
   */
  /**
   * @inner
   * @typedef {Object} aboutProductList
   * @property {String} aboutProductList.aboutProductDescription The about product description
   */
  getAboutProduct: async function (productCode) {
    const query = `select about.about_product_description as aboutProductDescription
    from about_product as about
    inner join product on product.product_unique_id = about.product_unique_fk
    where product.product_code = ? ;`
     const result = await db.mysqlHelpers.runQueryWithParameters(query, productCode)
     return result
  },

  /**
   * @name validateCategoryCode
   * @function
   * @instance
   * @memberof module:repository/product
   * @param {String} categoryCode The category code
   * @returns {boolean} The boolean status of validation
   */
  validateCategoryCode: async function (categoryCode) {
    const query = `SELECT EXISTS (SELECT 1 FROM product_category WHERE product_category_code = ?) as isExist;`

    const [{ isExist }] = await db.mysqlHelpers.runQueryWithParameters(query, categoryCode)
    return !!(isExist)
  },

  /**
   * @name validateBrandCode
   * @function
   * @instance
   * @memberof module:repository/product
   * @param {String} brandCode The brand code
   * @returns {boolean} The boolean status of validation
   */
  validateBrandCode: async function (brandCode) {
    const query = `SELECT EXISTS (SELECT 1 FROM product_brand WHERE product_brand_code = ?) as isExist;`

    const [{ isExist }] = await db.mysqlHelpers.runQueryWithParameters(query, brandCode)
    return !!(isExist)
  }
}
