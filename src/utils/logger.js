const winston = require('winston')
require('winston-daily-rotate-file')

const loggerFormat = winston.format.printf((info) => {
  let formattedMessage = `${info.timestamp} ${info.level}: ${info.message}`
  if (info.response && info.response.data) formattedMessage += `\n${JSON.stringify(info.response.data)}`
  if (info.stack) formattedMessage += `\n${info.stack}`
  return formattedMessage
})

const fileFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'HH:mm:ss.SSS'
  }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  loggerFormat
)

const consoleFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'HH:mm:ss.SSS'
  }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.colorize(),
  loggerFormat
)

let httpFileTransports
if (process.env.LOGGER_HTTP_FILE) {
  httpFileTransports = new winston.transports.DailyRotateFile({
    filename: process.env.LOGGER_HTTP_FILE,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: process.env.LOGGER_MAX_SIZE,
    maxFiles: process.env.LOGGER_MAX_FILES,
    format: fileFormat
  })
}

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL,
  transports: [
    new winston.transports.Console({
      format: consoleFormat
    }),
    new winston.transports.DailyRotateFile({
      filename: process.env.LOGGER_FILE,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: process.env.LOGGER_MAX_SIZE,
      maxFiles: process.env.LOGGER_MAX_FILES,
      format: fileFormat
    })
  ]
})

module.exports = {
  logger,
  httpFileTransports,
  consoleFormat
}