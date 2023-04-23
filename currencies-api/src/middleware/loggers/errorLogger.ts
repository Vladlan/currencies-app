import expressWinston from 'express-winston'
import { transports } from 'winston'
import { logsFormat } from '../../utils'

const errorLoggerMiddleware = expressWinston.errorLogger({
  transports: [new transports.Console({ handleExceptions: true })],
  format: logsFormat,
})

export default errorLoggerMiddleware
