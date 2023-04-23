import expressWinston from 'express-winston'
import { transports } from 'winston'
import { logsFormat } from '../../utils'

const reqLoggerMiddleware = expressWinston.logger({
  transports: [new transports.Console()],
  format: logsFormat,
})

export default reqLoggerMiddleware
