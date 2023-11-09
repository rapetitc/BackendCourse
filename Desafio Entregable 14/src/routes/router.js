import { Router } from "express";

const router = Router()

router.get('/loggerTest', (req, res) => {
  const { first_name, last_name } = req.body
  const full_name = { first_name, last_name }

  const keys = Object.keys(full_name)
  let rej = 0
  try {
    keys.forEach((key, i) => {
      if (typeof full_name[key] == "undefined") {
        req.logger.warning(`${key} is set as undefined`)
        rej++
      }
      if (keys.length == rej) throw new Error('No Info To Evaluate')
    })
  } catch (error) {
    if (error.message == 'No Info To Evaluate') {
      req.logger.error('User full name is undefined')
      return res.status(400).send({
        status: 'error',
        message: 'Bad Request'
      })
    }
  }

  req.logger.debug(`${full_name.first_name.toUpperCase()} ${full_name.last_name.toUpperCase()} esta registrando esta informacion`)
  return res.status(200).send({
    status: 'success',
    message: 'Logged'
  })
})

export default router