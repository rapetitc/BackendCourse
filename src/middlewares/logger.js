import logger from "../utils/logger.js"

export default (req, res, next) => {
  req.logger = logger
  req.logger.info(`[${req.method}] FROM ${req.ip} TO ${req.url}`)
  next()
}