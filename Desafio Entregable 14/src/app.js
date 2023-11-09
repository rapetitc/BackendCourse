import express from 'express'

import useLogger from './middlewares/useLogger.js'
import useHandleError from './middlewares/useHandleError.js'
import logger from './utils/logger.js'
import router from './routes/router.js'
import { PORT } from './config/env.js'

const app = express()
app.use(express.json())

app.use(useLogger)

app.use('/', router)

app.use(useHandleError) // Unhandled Errors, It supose to receive fatal errors

app.listen(PORT, () => {
  logger.info(`Server is working on port ${PORT}`)
})