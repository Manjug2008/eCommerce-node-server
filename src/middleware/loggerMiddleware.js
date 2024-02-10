const logger = require('../utils/logger')

module.exports = function (req, res, next) {
  const { locals: { requestId } } = res
  logger.info(`${requestId} version: ${req.headers.version} ${req.method}${req.originalUrl}`)
  next()
}
