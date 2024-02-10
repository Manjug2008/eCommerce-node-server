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
  }
}
