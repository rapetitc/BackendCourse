import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

const customLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const customFormat = {
  console: combine(
    timestamp(),
    colorize({
      colors: {
        fatal: "bold yellow redBG",
        error: "bold black redBG",
        warning: "bold black yellowBG",
        info: "underline italic blue",
        http: "underline italic green",
        debug: "underline italic yellow",
      },
    }),
    printf(({ level, message, timestamp }) => {
      return `[${timestamp}] - ${level}: ${message}`;
    }),
  ),
  file: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `[${timestamp}] - ${level}: ${message}`;
    }),
  ),
};

const logger = createLogger({
  levels: customLevels,
  transports: [
    new transports.Console({
      level: "info",
      format: customFormat.console,
    }),
    new transports.File({
      level: "warning",
      format: customFormat.file,
      filename: "errors/errors.log",
    }),
  ],
});

export default logger;
