import { createLogger, format, transports } from 'winston'
import { NODE_ENV } from '../config/env.js'

const { combine, timestamp, printf, colorize } = format;

const customLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5
}
const customColors = {
  fatal: 'bold yellow redBG',
  error: 'bold black redBG',
  warning: 'bold black yellowBG',
  info: 'underline italic blue',
  http: 'underline italic green',
  debug: 'underline italic yellow'
}
const customFormat = combine(
  timestamp(),
  colorize({ colors: customColors }),
  printf(({ level, message, timestamp }) => {
    return `[${timestamp}] - ${level}: ${message}`;
  })
)


export default NODE_ENV === 'production' ? createLogger({
  levels: customLevels,
  format: customFormat,
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      filename: 'errors.log'
    })
  ]
}) : createLogger({
  levels: customLevels,
  format: customFormat,
  transports: [
    new transports.Console({
      level: 'debug'
    })
  ]
})