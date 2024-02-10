module.exports = function (req, res, next) {
  const { locals: { versionObject } } = res
  return versionObject(req, res, next)
}
