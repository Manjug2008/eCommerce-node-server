/**
 * @module utils/envConfig
 */

const envConfig = () => {
  const { DB_MYSQL_USERNAME, DB_MYSQL_PASSWORD, DB_MYSQL_HOST, DB_MYSQL_DBNAME,
    SERVER_PORT, APP_SECRET} = process.env


  if (!DB_MYSQL_USERNAME || !DB_MYSQL_PASSWORD || !DB_MYSQL_HOST || !DB_MYSQL_DBNAME) {
    throw new Error('The MySQL environment variables are not defined')
  }

  if (!SERVER_PORT) {
    throw new Error('The Server environment variables are not defined')
  }

}

module.exports = envConfig
