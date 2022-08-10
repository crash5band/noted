const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode?? 500)
  return res.json({
    message: err.message,
    stack: process.env.NODE_ENVIRONMENT === 'production' ? null : err.stack
  })
}

module.exports = errorHandler
