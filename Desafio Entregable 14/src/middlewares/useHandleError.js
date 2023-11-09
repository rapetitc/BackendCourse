export default (error, req, res, next) => {
  req.logger.fatal(error)
  return res.status(500).send({
    status: 'error',
    message: 'Server Error'
  })
}