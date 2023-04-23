import { createLogger, format, transports } from 'winston'
import { ENV_DEV, ENV_TEST, LOGGER_MSG } from '../constants'
import { get } from 'lodash'

export const logsFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    const { timestamp, level, message, durationMs, meta, ...args } = info

    const errDescription = [
      message,
      get(meta, 'error.error.details[0].message') || get(meta, 'message'),
    ]
      .filter(Boolean)
      .join()

    let parsedArgs = ''
    if (![ENV_DEV, ENV_TEST].includes(process.env.NODE_ENV as string)) {
      parsedArgs = Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
    }

    const execTimeInfo = durationMs ? ` (${durationMs} ms)` : ''
    const msg = `${errDescription}${execTimeInfo} ${parsedArgs}`
    return LOGGER_MSG(timestamp, level, msg)
  }),
)

export const winstonLogger = createLogger({
  transports: [new transports.Console({ handleExceptions: true })],
  format: logsFormat,
})

export const disableWinstonLoggerForTests = () => {
  if (process.env.NODE_ENV === ENV_TEST) {
    winstonLogger.warn(`DISABLING WINSTON LOGGER FOR '${ENV_TEST}' ENV`)
    winstonLogger.transports.forEach((t) => (t.silent = true))
  }
}
