const mysql = require('mysql')


// Below source connects Mysql
const mySqlConfig = {
  connectionLimit: 25,
  host: process.env.DB_MYSQL_HOST,
  user: process.env.DB_MYSQL_USERNAME,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DBNAME,
  multipleStatements: true
}
const mySqlPool = mysql.createPool(mySqlConfig)

module.exports.mysqlHelpers = {
  runQuery: (query) => {
    return new Promise((resolve, reject) => {
      mySqlPool.query(query, function (err, results) {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
    })
  },

  runQueryWithParameters: (query, ...parameters) => {
    return new Promise((resolve, reject) => {
      mySqlPool.query(query, parameters, function (err, results) {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
    })
  }
}

module.exports.mysqlPool = mySqlPool
